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
        { title: 'Create Wizards' },
        { title: 'Chat with Data' },
        { title: 'Build Feed' },
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
        <div class="bg-gray-950/30 rounded-2xl p-8 border border-gray-700 border-dashed shadow-xl flex flex-col transform hover:-translate-y-2 transition-transform duration-300 items-center justify-center text-center hover:border-emerald-500 hover:text-emerald-400 cursor-pointer">
            <div class="flex-shrink-0 bg-gray-700/50 text-gray-400 rounded-full h-14 w-14 flex items-center justify-center"><i data-feather="plus" class="w-7 h-7"></i></div>
            <h3 class="text-2xl font-bold mt-6">Create New Wizard</h3>
            <p class="text-gray-400 mt-2 flex-grow">Build a custom AI agent tailored to your specific business needs.</p>
        </div>`
};


// Configuration for each available table
const TABLE_DETAILS_DATA = {
    fct_orders: {
        rows: "5.3 M",
        included: true,
        desc: "Core fact table for all transactional data. Each row represents a single order.",
        questions: [
            "What is the total revenue per month?",
            "How many orders were placed last week?",
            "Show the average order value (AOV)."
        ],
        fields: [
            { name: 'order_id', type: 'integer', desc: 'Unique identifier for each order.', values: null },
            { name: 'customer_id', type: 'integer', desc: 'Foreign key linking to the dim_customers table.', values: null },
            { name: 'order_date', type: 'timestamp', desc: 'Timestamp when the order was placed.', values: null },
            { name: 'status', type: 'string', desc: 'The current status of the order.', values: [
                { value: 'COMPLETED', pct: 85.2 }, { value: 'RETURNED', pct: 9.8 }, { value: 'CANCELLED', pct: 5.0 },
            ]},
            { name: 'total_amount', type: 'numeric', desc: 'The total value of the order in USD.', values: null }
        ]
    },
    dim_customers: {
        rows: "820 K",
        included: true,
        desc: "Dimension table with customer profile information.",
         questions: [
            "Who are the top 10 customers by lifetime value?",
            "What is the distribution of customers by industry?",
            "How many new customers signed up last month?"
        ],
        fields: [
            { name: 'customer_id', type: 'integer', desc: 'Unique identifier for each customer.', values: null },
            { name: 'signup_date', type: 'date', desc: 'Date when the customer created their account.', values: null },
            { name: 'region', type: 'string', desc: 'Geographic region of the customer.', values: [
                { value: 'North America', pct: 45.1 }, { value: 'Europe', pct: 32.7 }, { value: 'Asia-Pacific', pct: 15.3 }, { value: 'Other', pct: 6.9 },
            ]},
            { name: 'industry', type: 'string', desc: 'The industry segment of the customer.', values: [
                { value: 'SaaS', pct: 42.1 }, { value: 'E-commerce', pct: 25.5 }, { value: 'Fintech', pct: 14.9 }, { value: 'Healthcare', pct: 10.3 }, { value: 'Other', pct: 7.2 },
            ]}
        ]
    },
    marketing_spend: { 
        rows: "15.7 K",
        included: true,
        desc: "Tracks daily ad spend across all channels.", 
        questions: [
            "What was our total ad spend last quarter?", 
            "Which channel has the best ROAS?", 
            "Compare spend vs. new customers acquired."
        ], 
        fields: [
             { name: 'spend_date', type: 'date', desc: 'Date of the ad spend.', values: null },
             { name: 'channel', type: 'string', desc: 'Marketing channel where spend occurred.', values: [
                { value: 'Google Ads', pct: 55.8 }, { value: 'Meta', pct: 30.1 }, { value: 'LinkedIn', pct: 14.1 },
            ]},
             { name: 'cost', type: 'numeric', desc: 'Total cost for the day on that channel.', values: null }
        ] 
    },
    ga4_events_raw: { 
        rows: "18.1 B",
        included: false,
        desc: "Raw, unprocessed Google Analytics 4 event stream.", 
        questions: [
            "What is the most common user journey on the website?", 
            "Analyze the conversion funnel for the 'free trial' goal."
        ], 
        fields: [
            { name: 'event_timestamp', type: 'timestamp', desc: 'Precise time of the event.', values: null },
            { name: 'event_name', type: 'string', desc: 'Name of the tracked event (e.g., page_view, add_to_cart).', values: [
                { value: 'page_view', pct: 60.3 }, { value: 'session_start', pct: 15.1 }, { value: 'scroll', pct: 12.9 }, { value: 'click', pct: 11.7 },
            ]},
        ]
    },
};

// Configuration for each available Wizard
const WIZARD_DATA = {
    'Growth Strategist': {
        color: 'indigo',
        icon: 'bar-chart-2',
        description: 'Analyzes user acquisition, feature adoption, and funnel conversion KPIs.',
        tables: ['dim_customers', 'ga4_events_raw'],
        subtitle: 'Ask questions about user growth, funnels, and feature adoption.',
        placeholder: 'Ask about user growth, funnels...',
        questions: ['What is our user growth rate MoM?', 'Analyze the trial-to-paid conversion funnel', 'Which acquisition channels are most effective?'],
        questionMap: {
            'what is our user growth rate mom?': 'arr',
            'analyze the trial-to-paid conversion funnel': 'segments',
            'which acquisition channels are most effective?': 'newVsReturn'
        }
    },
    'Revenue Analyst': {
        color: 'emerald',
        icon: 'dollar-sign',
        description: 'Tracks financial metrics like ARR, LTV, and churn. Provides revenue forecasts.',
        tables: ['fct_orders', 'dim_customers'],
        subtitle: 'Ask questions about revenue, customers, and financial performance.',
        placeholder: 'Ask about ARR, churn, or top customers...',
        questions: ['Show me quarterly ARR trend', 'Which are my top 5 customer segments?', 'Analyze new vs returning orders'],
         questionMap: {
            'show me quarterly arr trend': 'arr',
            'which are my top 5 customer segments?': 'segments',
            'analyze new vs returning orders': 'newVsReturn'
        }
    },
    'Ops Optimizer': {
        color: 'rose',
        icon: 'truck',
        description: 'Monitors supply chain, inventory levels, and shipping logistics.',
        tables: ['fct_orders', 'marketing_spend'],
        subtitle: 'Ask questions about operations, shipping, and inventory management.',
        placeholder: 'Ask about shipping, inventory...',
        questions: ['What is the average time to ship?', 'Show inventory levels for top products', 'Analyze return rates by product category'],
        questionMap: {
            'what is the average time to ship?': 'newVsReturn',
            'show inventory levels for top products': 'segments',
            'analyze return rates by product category': 'arr'
        }
    }
};

// Blueprints for generating charts in the chat and feed
const feedChartBlueprints = {
    arr: { 
        title: 'Quarterly ARR Trend', 
        type: 'line', 
        data: { labels: ['Q1', 'Q2', 'Q3', 'Q4', "Q1 '25"], datasets: [{ data: [1.2, 1.5, 1.4, 1.8, 2.1], borderColor: '#10b981', tension: 0.4, fill: true }] }, 
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }}, scales: { y: { ticks: { callback: v => `$${v}M` }}}}
    },
    segments: { 
        title: 'Top 5 Customer Segments', 
        type: 'doughnut', 
        data: { labels: ['SaaS', 'E-commerce', 'Fintech', 'Healthcare', 'Other'], datasets: [{ data: [45, 25, 15, 10, 5], backgroundColor: ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#64748b'], borderWidth: 0 }] }, 
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } }}}
    },
    newVsReturn: { 
        title: 'New vs. Returning Orders', 
        type: 'bar', 
        data: { labels: ['W1', 'W2', 'W3', 'W4'], datasets: [ { label: 'New', data: [120, 130, 155, 140], backgroundColor: '#3b82f6' }, { label: 'Returning', data: [250, 280, 310, 290], backgroundColor: '#10b981' } ] }, 
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } }, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } }} }
    }
};
