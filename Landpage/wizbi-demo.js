document.addEventListener('alpine:init', () => {
    Alpine.data('wizbiChatDemo', () => ({
        messages: [],
        isTyping: false,
        hasStarted: false,
        wizbis: {
            sales: { name: 'Sales Wizard', avatar: 'https://placehold.co/40x40/5b21b6/FFFFFF?text=S' },
            marketing: { name: 'Marketing Wizard', avatar: 'https://placehold.co/40x40/1d4ed8/FFFFFF?text=M' },
            finance: { name: 'Finance Wizard', avatar: 'https://placehold.co/40x40/047857/FFFFFF?text=F' },
        },
        demoScenario: [
            { id: 1, author: 'user', text: "How did our Q2 revenue from new customers in the US compare to Q1?" },
            { id: 2, author: 'wizbi', wizbi_key: 'sales', text: "Here's the quarterly comparison:", summary: "📈 We saw a <strong>strong 54% increase</strong> in Q2! <br>Q1: $120k | Q2: $185k", chartType: 'bar', chartData: [ { label: 'Q1', value: 120000, height: 60, value_display: '$120k', delay: 100 }, { label: 'Q2', value: 185000, height: 92.5, value_display: '$185k', delay: 200 } ] },
            { id: 3, author: 'user', text: "Show me the trend of user signups over the last 7 days." },
            { id: 4, author: 'wizbi', wizbi_key: 'marketing', text: "Here is the user signup trend for the past week:", summary: "🚀 Signups are trending up, with a <strong>peak of 90 today!</strong>", chartType: 'line', chartData: [ {label: 'D-6', value: 25}, {label: 'D-5', value: 30}, {label: 'D-4', value: 45}, {label: 'D-3', value: 40}, {label: 'D-2', value: 60}, {label: 'D-1', value: 75}, {label: 'Today', value: 90} ] },
            { id: 5, author: 'user', text: "Great! Now what's the revenue breakdown by region for this quarter?" },
            { id: 6, author: 'wizbi', wizbi_key: 'finance', text: "Here is the revenue breakdown by region:", summary: "🌎 North America continues to be our <strong>dominant market</strong> at 45%.", chartType: 'pie', chartData: [ {label: 'NA', value: 45, color: '#8b5cf6'}, {label: 'EMEA', value: 35, color: '#22d3ee'}, {label: 'APAC', value: 15, color: '#34d399'}, {label: 'LATAM', value: 5, color: '#f87171'} ] },
        ],
        
        init() {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !this.hasStarted) {
                    this.hasStarted = true;
                    this.run();
                }
            }, { threshold: 0.5 });
            observer.observe(this.$el);
        },
        
        prepareChartData(message) {
            if (message.chartType === 'line') {
                const data = message.chartData;
                const maxVal = Math.max(...data.map(p => p.value));
                const width = 300, height = 130, padding = 10;
                const points = data.map((point, i) => {
                    const x = (width / (data.length - 1)) * i;
                    const y = height - (point.value / maxVal * (height - padding));
                    return { ...point, x, y };
                });
                message.linePath = points.reduce((path, p, i) => path + (i === 0 ? 'M' : 'L') + `${p.x} ${p.y} `, '');
                message.chartData = points;
            } else if (message.chartType === 'pie') {
                let cumulativePercent = 0;
                const gradientParts = message.chartData.map(slice => {
                    const start = cumulativePercent;
                    const end = cumulativePercent + slice.value;
                    cumulativePercent = end;
                    return `${slice.color} ${start}% ${end}%`;
                });
                message.pieGradient = `conic-gradient(${gradientParts.join(', ')})`;
            }
            return message;
        },
        
        async run() {
            this.messages = [];
            await new Promise(r => setTimeout(r, 500));

            for (let i = 0; i < this.demoScenario.length; i++) {
                let messageData = { ...this.demoScenario[i] };

                if (messageData.author === 'user') {
                    this.messages.push(messageData);
                    this.$nextTick(() => { this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight; });
                    await new Promise(r => setTimeout(r, 1500));
                } 
                else if (messageData.author === 'wizbi') {
                    this.isTyping = true;
                    await new Promise(r => setTimeout(r, 1500));
                    this.isTyping = false;
                    
                    let wizbiMessage = { ...messageData, wizbi: this.wizbis[messageData.wizbi_key], showChart: false };
                    if (wizbiMessage.chartData) {
                       wizbiMessage = this.prepareChartData(wizbiMessage);
                    }
                    
                    this.messages.push(wizbiMessage);
                    await this.$nextTick();
                    
                    if (wizbiMessage.chartData) {
                        await new Promise(r => setTimeout(r, 100));
                        const msgIndex = this.messages.findIndex(m => m.id === wizbiMessage.id);
                        if(msgIndex !== -1) this.messages[msgIndex].showChart = true;
                    }

                    this.$nextTick(() => { this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight; });
                    await new Promise(r => setTimeout(r, 3500));
                }
            }

            // Wait and loop
            await new Promise(r => setTimeout(r, 5000));
            this.run();
        }
    }));
});
