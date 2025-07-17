document.addEventListener('alpine:init', () => {
    Alpine.data('dataAgentDemo', () => ({
        logs: [], status: 'IDLE', activeScript: null, scriptRunning: false,
        clearPrevious() { 
            this.logs = []; 
            if (this.$refs.visualPanel) this.$refs.visualPanel.innerHTML = ''; 
            this.scriptRunning = true; 
        },
        renderIcons() {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        },
        addLog(log, delay) { 
            return new Promise(resolve => { setTimeout(() => { 
                if (this.logs.length > 50) this.logs.shift(); 
                this.logs.push({ id: Date.now(), timestamp: new Date().toLocaleTimeString(), level: `[${log.level.padEnd(8)}]`, message: log.message, color: log.color }); 
                this.$nextTick(() => { if (this.$refs.logContainer) this.$refs.logContainer.scrollTop = this.$refs.logContainer.scrollHeight }); 
                resolve(); 
            }, delay); }); 
        },
        addVisual(id, html, delay) {
            return new Promise(resolve => {
                setTimeout(() => {
                    if (!this.$refs.visualPanel) { resolve(); return; }
                    const el = document.createElement('div');
                    el.id = `vis-${id}`;
                    el.className = 'fade-in-element';
                    el.innerHTML = html;
                    this.$refs.visualPanel.appendChild(el);
                    this.$nextTick(() => {
                        setTimeout(() => {
                            el.classList.add('is-visible');
                            this.renderIcons();
                        }, 10);
                        this.$refs.visualPanel.scrollTop = this.$refs.visualPanel.scrollHeight;
                        resolve();
                    });
                }, delay);
            });
        },
        updateVisual(id, newHtml) {
            return new Promise(resolve => {
                if (!this.$refs.visualPanel) { resolve(); return; }
                const el = this.$refs.visualPanel.querySelector(`#vis-${id}`);
                if (el) {
                    el.innerHTML = newHtml;
                    this.renderIcons();
                }
                resolve();
            });
        },
        async animateCounter(id, finalValue, duration) {
            const el = this.$refs.visualPanel.querySelector(`#${id}`);
            if (!el) return;
            let start = 0;
            const increment = finalValue / (duration / 16);
            const interval = setInterval(() => {
                start += increment;
                if (start >= finalValue) {
                    el.innerText = `$${finalValue.toLocaleString()}`;
                    clearInterval(interval);
                } else {
                    el.innerText = `$${Math.ceil(start).toLocaleString()}`;
                }
            }, 16);
        },
        async runScript(scriptName) {
            if (this.scriptRunning) return;
            this.activeScript = scriptName;
            this.clearPrevious();

            try {
                if (scriptName === 'mapping') {
                    await this.addLog({ level: 'INIT', message: 'Starting warehouse catalog process...', color: 'text-cyan-400' }, 100);
                    await this.addVisual('title', '<h3 class="text-lg font-bold text-white mb-4">Live Data Catalog & Lineage</h3>', 100);
                    await this.addLog({ level: 'SCAN', message: 'Scanning schema: `prod`...', color: 'text-gray-400' }, 500);
                    await this.addVisual('db', '<div class="flex items-center gap-2 p-2 bg-slate-800 rounded"><i data-lucide="database"></i><span>prod_db</span></div>', 500);
                    await this.addLog({ level: 'CATALOG', message: 'Found table: `fact_orders`', color: 'text-gray-400' }, 700);
                    await this.addVisual('table', '<div class="ml-6 my-2 p-2 border border-gray-600 rounded bg-slate-800 transition-all duration-300"><div class="font-bold flex items-center gap-2"><i data-lucide="table-2"></i>fact_orders</div><div id="columns" class="mt-2 pl-4 space-y-1 text-sm"></div></div>', 700);
                    await this.addLog({ level: 'ANALYZE', message: 'Analyzing columns for `fact_orders`...', color: 'text-gray-400' }, 300);
                    await this.updateVisual('table', '<div class="font-bold flex items-center gap-2"><i data-lucide="table-2"></i>fact_orders</div><div id="columns" class="mt-2 pl-4 space-y-1 text-sm"><p class="fade-in-element is-visible text-gray-400">order_id <span class="text-purple-400">(INT)</span></p></div>');
                    await new Promise(r => setTimeout(r, 400));
                    await this.updateVisual('table', '<div class="font-bold flex items-center gap-2"><i data-lucide="table-2"></i>fact_orders</div><div id="columns" class="mt-2 pl-4 space-y-1 text-sm"><p class="fade-in-element is-visible text-gray-400">order_id <span class="text-purple-400">(INT)</span></p><p class="fade-in-element is-visible text-gray-400">amount <span class="text-purple-400">(DECIMAL)</span></p></div>');
                    await new Promise(r => setTimeout(r, 400));
                    await this.updateVisual('table', '<div class="font-bold flex items-center gap-2"><i data-lucide="table-2"></i>fact_orders</div><div id="columns" class="mt-2 pl-4 space-y-1 text-sm"><p class="fade-in-element is-visible text-gray-400">order_id <span class="text-purple-400">(INT)</span></p><p class="fade-in-element is-visible text-gray-400">amount <span class="text-purple-400">(DECIMAL)</span></p><p class="fade-in-element is-visible text-gray-400">customer_email <span class="text-purple-400">(VARCHAR)</span></p></div>');
                    await this.addLog({ level: 'AI-DOC', message: 'Generating business description...', color: 'text-purple-400' }, 800);
                    await this.addVisual('ai-doc', '<div class="p-2 ml-6 my-2 bg-purple-900/50 border-l-2 border-purple-400 text-purple-300 text-xs flex items-start gap-2"><i data-lucide="sparkles" class="w-4 h-4 mt-0.5 flex-shrink-0"></i><div><strong>AI Description:</strong> Contains core order information including amount, status, and customer keys. Central table for revenue reporting.</div></div>', 800);
                    await this.addLog({ level: 'PII-SCAN', message: 'Scanning `fact_orders` for PII...', color: 'text-yellow-400' }, 500);
                    await this.addLog({ level: 'PII-FOUND', message: 'PII found in `customer_email`. Tagging applied.', color: 'text-yellow-400' }, 1000);
                    this.$refs.visualPanel.querySelector('#vis-table > div').classList.add('bg-yellow-900/30', 'border-yellow-500');
                    await this.addLog({ level: 'LINEAGE', message: 'Tracing downstream dependencies...', color: 'text-gray-400' }, 800);
                    await this.addVisual('lineage', '<svg class="w-full h-24 my-2"><line x1="50%" y1="0" x2="50%" y2="100%" stroke="#475569" stroke-width="2" class="lineage-path"/></svg><div class="flex items-center gap-2 p-2 bg-slate-800 rounded border border-cyan-500"><i data-lucide="pie-chart"></i><span>rpt_monthly_revenue</span></div>', 800);
                    await this.addLog({ level: 'DONE', message: 'Catalog & lineage mapping complete.', color: 'text-green-400' }, 500);
                } else if (scriptName === 'optimization') {
                    await this.addLog({ level: 'INIT', message: 'Starting cost & performance analysis...', color: 'text-cyan-400' }, 100);
                    await this.addVisual('title', '<h3 class="text-lg font-bold text-white mb-4">Cost Optimization Report</h3>', 100);
                    await this.addLog({ level: 'SCAN', message: 'Analyzing query history (last 30 days)...', color: 'text-gray-400' }, 800);
                    await this.addLog({ level: 'COST', message: 'High-Cost Query Detected!', color: 'text-red-500' }, 1200);
                    await this.addVisual('cost-query', '<div class="p-3 my-1 bg-red-900/30 border border-red-500 rounded"><div class="flex items-start gap-2"><i data-lucide="alert-triangle" class="text-red-400 mt-1"></i><div><h4 class="font-bold text-red-400">Costly Query: `q_xyz789`</h4><p class="text-sm"><strong>Cost:</strong> $127.50</p><p class="text-sm"><strong>Reason:</strong> Full table scan on `events_log` (3.2 TB processed)</p></div></div></div>', 1200);
                    await this.addLog({ level: 'AI-FIX', message: 'AI Recommendation: Add partitioning on `event_date`.', color: 'text-green-400' }, 1000);
                    await this.addVisual('ai-fix', '<div class="p-3 my-1 bg-green-900/30 border border-green-500 rounded"><div class="flex items-start gap-2"><i data-lucide="lightbulb" class="text-green-400 mt-1"></i><div><h4 class="font-bold text-green-400">Optimization Suggestion</h4><p class="text-sm">Partition table `events_log` by `event_date` to reduce scan size.</p></div></div></div>', 1000);
                    await this.addLog({ level: 'SCAN', message: 'Scanning for unused assets...', color: 'text-gray-400' }, 1000);
                    await this.addLog({ level: 'UNUSED', message: 'Table `stg_temp_users_2022` not accessed in 180 days.', color: 'text-yellow-400' }, 800);
                    await this.addVisual('unused-table', '<div class="p-3 my-1 bg-yellow-900/30 border border-yellow-500 rounded"><div class="flex items-start gap-2"><i data-lucide="trash-2" class="text-yellow-400 mt-1"></i><div><h4 class="font-bold text-yellow-400">Unused Table: `stg_temp_users_2022`</h4><p class="text-sm"><strong>Storage:</strong> 15.7 GB</p><p class="text-sm"><strong>Recommendation:</strong> Archive or Drop</p></div></div></div>', 800);
                    await this.addLog({ level: 'SUMMARY', message: 'Generating optimization savings summary...', color: 'text-green-400' }, 800);
                    await this.addVisual('summary', '<div class="p-4 my-2 bg-green-900/30 border-2 border-green-500 rounded text-center"><h4 class="font-bold text-green-300 uppercase tracking-wider">Total Estimated Annual Savings</h4><div id="savings-counter" class="text-4xl lg:text-5xl font-bold text-white my-2">$0</div><p class="text-sm text-green-400">from query optimization and storage reduction</p></div>', 800);
                    await this.animateCounter('savings-counter', 6036, 1500);
                    await this.addLog({ level: 'DONE', message: 'Analysis complete. Report generated.', color: 'text-green-400' }, 100);
                } else if (scriptName === 'chat') {
                    await this.addLog({ level: 'INIT', message: 'Engineer Assist Chat activated.', color: 'text-cyan-400' }, 100);
                    await this.addVisual('chat-container', '<div class="space-y-4"></div>', 100);
                    await this.addLog({ level: 'USER', message: 'Why is the `rpt_revenue` query slow?', color: 'text-blue-400' }, 1000);
                    await this.updateVisual('chat-container', '<div class="space-y-4"><div class="flex justify-end"><div class="agent-chat-bubble-user p-3 rounded-lg max-w-xs">Why is the `rpt_revenue` query slow?</div></div></div>');
                    await this.addLog({ level: 'CONTEXT', message: 'Fetching metadata & query history...', color: 'text-gray-500' }, 1500);
                    await this.addLog({ level: 'CONTEXT', message: 'Found lineage: `fact_orders` -> `rpt_revenue`. `fact_orders` has 1.2B rows.', color: 'text-gray-500' }, 1000);
                    await this.addLog({ level: 'AGENT', message: 'Analyzing query plan... Found full table scan.', color: 'text-purple-400' }, 1500);
                    await this.updateVisual('chat-container', document.getElementById('vis-chat-container').innerHTML + '<div class="flex justify-start"><div class="agent-chat-bubble-agent p-3 rounded-lg max-w-md"><p>The query performs a full table scan on `fact_orders` because there is no index on the `order_date` filter. I suggest adding an index to improve performance.</p><div class="mt-2 p-2 rounded-md code-block text-xs"><pre><code>CREATE INDEX idx_orders_date \nON fact_orders (order_date);</code></pre></div></div></div>');
                    await this.addLog({ level: 'USER', message: 'Thanks! Can you show me the full lineage for fact_orders?', color: 'text-blue-400' }, 3000);
                    await this.updateVisual('chat-container', document.getElementById('vis-chat-container').innerHTML + '<div class="flex justify-end"><div class="agent-chat-bubble-user p-3 rounded-lg max-w-xs">Thanks! Can you show me the full lineage for fact_orders?</div></div>');
                    await this.addLog({ level: 'AGENT', message: 'Generating lineage graph...', color: 'text-purple-400' }, 1500);
                    await this.updateVisual('chat-container', document.getElementById('vis-chat-container').innerHTML + '<div class="flex justify-start"><div class="agent-chat-bubble-agent p-3 rounded-lg max-w-md"><p>Certainly. Here is the data lineage for `fact_orders`:</p><div class="mt-2 p-2 rounded bg-slate-900/50"><svg viewBox="0 0 400 100"><defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#67e8f9"></path></marker></defs><path d="M 90 50 L 150 50" stroke="#67e8f9" stroke-width="2" marker-end="url(#arrow)" class="lineage-path" style="animation-delay: 0s;"></path><path d="M 250 50 L 310 50" stroke="#67e8f9" stroke-width="2" marker-end="url(#arrow)" class="lineage-path" style="animation-delay: 0.5s;"></path><g><rect x="10" y="35" width="80" height="30" rx="5" fill="#1e293b" stroke="#38bdf8"></rect><text x="50" y="55" font-size="12" fill="white" text-anchor="middle">API Source</text></g><g><rect x="150" y="35" width="100" height="30" rx="5" fill="#4c1d95" stroke="#a855f7"></rect><text x="200" y="55" font-size="12" fill="white" text-anchor="middle">fact_orders</text></g><g><rect x="310" y="35" width="80" height="30" rx="5" fill="#1e293b" stroke="#38bdf8"></rect><text x="350" y="55" font-size="12" fill="white" text-anchor="middle">BI Report</text></g></svg></div></div></div>');
                }
            } catch(e) {
                console.error("Data Agent demo failed:", e);
                this.addLog({level: "ERROR", message: "Demo script failed. Please try again.", color: "text-red-500"}, 100);
            } finally {
                this.scriptRunning = false;
            }
        }
    }));
});
