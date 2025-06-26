/**
 * data.js
 * This file contains all the dynamic content for the BI Magics demo.
 * To add or change tables, wizards, or charts, edit the objects below.
 * The main `index.html` file will load this data to build the UI.
 */

// General App Content
const APP_CONTENT = {
    progressSteps: [
        { title: 'Connect Warehouse' },
        { title: 'Map Tables' },
        { title: 'Activate Wizards' },
        { title: 'Chat with Data' },
        { title: 'Curate Feed' },
    ],
    warehouseTypes: ['Google BigQuery', 'Snowflake', 'Amazon Redshift', 'Databricks', 'PostgreSQL'],
    initialConnectionStatusHTML: `
        <div class="text-center w-full h-full flex flex-col items-center justify-center">
             <div class="w-64 h-64 relative">
                 <svg viewBox="0 0 200 200" class="w-full h-full">
                     <circle cx="100" cy="100" r="50" fill="none" stroke="#374151" stroke-width="2"/>
                     <circle cx="100" cy="20" r="8" fill="#10b981"/>
                     <path d="M100 28 v 52" stroke="#374151" stroke-width="2" stroke-dasharray="4 4"/>
                     <g class="flow-dot" style="animation-delay: 0s;"><circle cx="100" cy="100" r="4" fill="#10b981"/></g>
                     <g class="flow-dot" style="animation-delay: 0.5s;"><circle cx="100" cy="100" r="4" fill="#3b82f6"/></g>
                     <g class="flow-dot" style="animation-delay: 1s;"><circle cx="100" cy="100" r="4" fill="#f97316"/></g>
                     <g class="flow-dot" style="animation-delay: 1.5s;"><circle cx="100" cy="100" r="4" fill="#8b5cf6"/></g>
                 </svg>
             </div>
             <p class="mt-4 text-gray-400">Awaiting connection details...</p>
        </div>`,
    createNewWizardCardHTML: `
        <div id="create-new-wizard-card" class="bg-gray-950/30 rounded-2xl p-8 border border-gray-700 border-dashed shadow-xl flex flex-col transform hover:-translate-y-2 transition-transform duration-300 items-center justify-center text-center hover:border-emerald-500 hover:text-emerald-400 cursor-pointer">
            <div class="flex-shrink-0 bg-gray-700/50 text-gray-400 rounded-full h-14 w-14 flex items-center justify-center"><i data-feather="plus" class="w-7 h-7"></i></div>
            <h3 class="text-2xl font-bold mt-6">Create New Wizard</h3>
            <p class="text-gray-400 mt-2 flex-grow">Build a custom AI agent tailored to your specific business needs.</p>
        </div>`,
    newWizardDefaults: {
        name: "My Custom Wizard",
        expertise: "Analyzes custom operational KPIs and reports on daily user activity."
    }
};


// Configuration for each available table
const TABLE_DETAILS_DATA = {
    fct_orders: {
        rows: "5.3 M", included: true,
        desc: "Core fact table for all transactional data. Each row represents a single order, linking customer information, dates, and financial amounts. It serves as the single source of truth for revenue and order analysis.",
        questions: ["What is the total revenue per month?", "How many orders were placed last week?", "Show the average order value (AOV)."],
        fields: [
            { name: 'order_id', type: 'integer', desc: 'Unique identifier for each order.' },
            { name: 'customer_id', type: 'integer', desc: 'Foreign key to dim_customers.' },
            { name: 'order_date', type: 'timestamp', desc: 'Timestamp when the order was placed.' },
            { name: 'status', type: 'string', desc: 'The current status of the order.', values: [{ value: 'COMPLETED', pct: 85.2 }, { value: 'RETURNED', pct: 9.8 }, { value: 'CANCELLED', pct: 5.0 }] },
            { name: 'total_amount', type: 'numeric', desc: 'The total value of the order in USD.' }
        ]
    },
    dim_customers: {
        rows: "820 K", included: true,
        desc: "Dimension table with customer profile information. Contains demographic and firmographic data used for segmentation and cohort analysis.",
         questions: ["Who are the top 10 customers by lifetime value?", "What is the distribution of customers by industry?", "How has customer growth trended over time?"],
        fields: [
            { name: 'customer_id', type: 'integer', desc: 'Unique identifier for each customer.' },
            { name: 'signup_date', type: 'date', desc: 'Date when the customer created their account.' },
            { name: 'region', type: 'string', desc: 'Geographic region of the customer.', values: [{ value: 'North America', pct: 45.1 }, { value: 'Europe', pct: 32.7 }, { value: 'Asia-Pacific', pct: 15.3 }] },
            { name: 'industry', type: 'string', desc: 'The industry segment of the customer.', values: [{ value: 'SaaS', pct: 42.1 }, { value: 'E-commerce', pct: 25.5 }, { value: 'Fintech', pct: 14.9 }] }
        ]
    },
    marketing_spend: {
        rows: "15.7 K", included: true,
        desc: "Tracks daily marketing spend across all acquisition channels. This table is essential for calculating Cost Per Acquisition (CPA) and Return On Ad Spend (ROAS).",
        questions: ["What was our total ad spend last quarter?", "Which channel has the best ROAS?", "How does spend correlate with new user signups?"],
        fields: [
             { name: 'spend_date', type: 'date', desc: 'Date of the ad spend.' },
             { name: 'channel', type: 'string', desc: 'Marketing channel.', values: [{ value: 'Google Ads', pct: 55.8 }, { value: 'Meta', pct: 30.1 }, { value: 'LinkedIn', pct: 14.1 }] },
             { name: 'cost', type: 'numeric', desc: 'Total cost for the day on that channel.' }
        ]
    },
};

// Configuration for each available Wizard and their chat capabilities
const WIZARD_DATA = {
    'Revenue Analyst': {
        color: 'emerald', icon: 'dollar-sign',
        description: 'Tracks financial metrics like ARR, LTV, and churn.',
        tables: ['fct_orders', 'dim_customers'],
        subtitle: 'Ask questions about revenue, customers, and financial performance.',
        placeholder: 'Ask about ARR, churn, or top customers...',
        questions: ['Show me quarterly ARR trend', 'What is our Average Order Value?', 'Which are my top 5 customer segments?'],
        questionMap: {
            'arr': {
                sql: "SELECT\n  DATE_TRUNC('quarter', order_date) AS quarter,\n  SUM(total_amount) / 1000000 AS total_arr_millions\nFROM fct_orders\nGROUP BY 1\nORDER BY 1;",
                text: null,
                chartType: 'arr'
            },
            'value': {
                sql: "SELECT\n  AVG(total_amount)\nFROM fct_orders\nWHERE status = 'COMPLETED';",
                text: "The Average Order Value (AOV) for completed orders is currently <strong class='text-emerald-400'>$142.55</strong>. This is up <strong class='text-emerald-400'>3.1%</strong> from last month.",
                chartType: null,
            },
            'segments': {
                 sql: "SELECT\n  c.industry,\n  SUM(o.total_amount) AS total_revenue\nFROM fct_orders o\nJOIN dim_customers c ON o.customer_id = c.customer_id\nGROUP BY 1\nORDER BY 2 DESC\nLIMIT 5;",
                 text: null,
                 chartType: 'segments'
            }
        }
    },
    'Growth Strategist': {
        color: 'indigo', icon: 'bar-chart-2',
        description: 'Analyzes user acquisition, funnels, and adoption.',
        tables: ['dim_customers', 'marketing_spend'],
        subtitle: 'Ask questions about user growth and marketing efficiency.',
        placeholder: 'Ask about user growth, funnels...',
        questions: ['How many new users signed up this month?', 'Analyze new vs returning orders', 'Which marketing channels are most effective?'],
        questionMap: {
            'users': {
                sql: "SELECT\n  COUNT(customer_id)\nFROM dim_customers\nWHERE DATE_TRUNC('month', signup_date) = DATE_TRUNC('month', CURRENT_DATE);",
                text: "This month, <strong class='text-indigo-400'>12,450</strong> new users have signed up. We are on track to exceed last month's total of 15,100.",
                chartType: null,
            },
            'returning': {
                sql: "SELECT \n  CASE WHEN is_first_order THEN 'New' ELSE 'Returning' END as customer_type, \n  COUNT(DISTINCT order_id) as order_count \nFROM fct_orders \nWHERE order_date >= CURRENT_DATE - INTERVAL '4 weeks' \nGROUP BY 1;",
                text: "Here is the breakdown of new vs. returning orders for the last four weeks.",
                chartType: 'newVsReturn'
            },
            'channels': {
                 sql: "SELECT \n  channel, \n  SUM(spend) / COUNT(DISTINCT new_users) as cost_per_acquisition \nFROM marketing_spend \nGROUP BY 1 \nORDER BY 2 ASC;",
                 text: "Google Ads appears to be the most effective channel with the lowest Cost Per Acquisition.",
                 chartType: 'segments' // Can reuse chart blueprints
            }
        }
    },
     'Ops Optimizer': {
        color: 'rose', icon: 'truck',
        description: 'Monitors supply chain, inventory, and logistics.',
        tables: ['fct_orders'],
        subtitle: 'Ask about shipping times, returns, and order statuses.',
        placeholder: 'Ask about shipping, returns...',
        questions: ['What is our return rate?', 'Show order status distribution', 'What is the average time to ship?'],
        questionMap: {
            'rate': {
                sql: "SELECT\n  100.0 * COUNT(CASE WHEN status = 'RETURNED' THEN 1 END) / COUNT(*)\nFROM fct_orders;",
                text: "Our current return rate is <strong class='text-rose-400'>9.8%</strong> across all orders.",
                chartType: null
            },
            'status': {
                sql: "SELECT\n  status, COUNT(*) as count\nFROM fct_orders\nGROUP BY 1;",
                text: "Here is the distribution of all order statuses.",
                chartType: 'segments' // Reusing a chart type for a different purpose
            },
            'ship': {
                sql: "SELECT\n  AVG(shipping_date - order_date) as avg_shipping_time\nFROM fct_orders\nWHERE status = 'COMPLETED';",
                text: "The average time from order to shipment is <strong class='text-rose-400'>1.8 days</strong>.",
                chartType: null,
            }
        }
    }
};

// Blueprints for generating charts and scorecards
const feedBlueprints = {
    charts: {
        arr: { title: 'Quarterly ARR Trend', type: 'line', sql: WIZARD_DATA['Revenue Analyst'].questionMap['arr'].sql, data: { labels: ["Q1 '24", "Q2 '24", "Q3 '24", "Q4 '24"], datasets: [{ data: [1.2, 1.5, 1.4, 1.8], borderColor: '#10b981', tension: 0.4, fill: true }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }}, scales: { y: { ticks: { callback: v => `$${v}M` }}}}},
        segments: { title: 'Revenue by Customer Segment', type: 'doughnut', sql: WIZARD_DATA['Revenue Analyst'].questionMap['segments'].sql, data: { labels: ['SaaS', 'E-commerce', 'Fintech', 'Healthcare', 'Other'], datasets: [{ data: [45, 25, 15, 10, 5], backgroundColor: ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#64748b'], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } }}}},
        newVsReturn: { title: 'New vs. Returning Orders', type: 'bar', sql: WIZARD_DATA['Growth Strategist'].questionMap['returning'].sql, data: { labels: ['W1', 'W2', 'W3', 'W4'], datasets: [ { label: 'New', data: [120, 130, 155, 140], backgroundColor: '#3b82f6' }, { label: 'Returning', data: [250, 280, 310, 290], backgroundColor: '#10b981' } ] }, options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } }, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } }} }}
    },
    scorecards: {
        aov: { title: 'Average Order Value', value: '$142.55', trend: '+3.1%', trendColor: 'text-emerald-400', sql: WIZARD_DATA['Revenue Analyst'].questionMap['value'].sql },
        newUsers: { title: 'New Users (MTD)', value: '12,450', trend: '+8.2%', trendColor: 'text-emerald-400', sql: WIZARD_DATA['Growth Strategist'].questionMap['users'].sql },
        churnRate: { title: 'Monthly Churn Rate', value: '2.1%', trend: '-0.2%', trendColor: 'text-emerald-400', sql: "SELECT\n  100.0 * COUNT(CASE WHEN status = 'CHURNED' THEN 1 END) / COUNT(*)\nFROM dim_customers\nWHERE signup_date < CURRENT_DATE - INTERVAL '1 month';" }
    }
};

// Items that appear in the feed by default
const PREPOPULATED_FEED_ITEMS = [
    { type: 'scorecard', id: 'aov' },
    { type: 'scorecard', id: 'newUsers' },
    { type: 'scorecard', id: 'churnRate' },
    { type: 'chart', id: 'arr' },
    { type: 'chart', id: 'segments' },
    { type: 'chart', id: 'newVsReturn' },
];
