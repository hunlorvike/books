// services/ScriptService.js
const ScriptService = {
    executedScripts: new Set(), // Track executed scripts

    /**
     * Executes scripts in content string and returns processed HTML
     * @param {string} content - HTML content containing scripts
     * @returns {string} - HTML content with executed scripts
     */
    executeScripts(content) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        this.executeScriptsInElement(tempDiv);
        return tempDiv.innerHTML;
    },

    /**
     * Executes scripts within a DOM element
     * @param {HTMLElement} element - DOM element containing scripts
     */
    executeScriptsInElement(element) {
        const scripts = element.getElementsByTagName('script');

        Array.from(scripts).forEach(oldScript => {
            try {
                const scriptId = this.generateScriptId(oldScript.textContent);

                // Skip if already executed
                if (this.executedScripts.has(scriptId)) {
                    return;
                }

                const newScript = this.createNewScript(oldScript);

                // Add to executed set before replacement
                this.executedScripts.add(scriptId);

                // Replace old script with new one
                oldScript.parentNode.replaceChild(newScript, oldScript);
            } catch (error) {
                console.error('Error executing script:', error);
            }
        });
    },

    /**
     * Creates a new script element from an old one with proper scoping
     * @param {HTMLElement} oldScript - Original script element
     * @returns {HTMLElement} - New script element
     */
    createNewScript(oldScript) {
        const newScript = document.createElement('script');

        // Copy attributes
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });

        if (oldScript.src) {
            newScript.src = oldScript.src;
        } else {
            // Wrap inline scripts in IIFE for scoping
            newScript.textContent = `
                (function() {
                    try {
                        ${oldScript.textContent}
                    } catch (error) {
                        console.error('Script execution error:', error);
                    }
                })();
            `;
        }

        return newScript;
    },

    /**
     * Generates a unique ID for a script based on its content
     * @param {string} content - Script content
     * @returns {string} - Unique hash ID
     */
    generateScriptId(content) {
        if (!content) return 'empty-script';

        let hash = 0;
        for (let i = 0; i < content.length; i++) {
            const char = content.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return `script-${hash}`;
    },

    /**
     * Clears the set of executed scripts
     * Should be called when changing pages or when scripts need to be re-executed
     */
    clearExecutedScripts() {
        this.executedScripts.clear();
    },

    /**
     * Vue directive handler for script execution
     * @param {HTMLElement} el - Element with v-execute-script directive
     */
    inserted(el) {
        this.executeScriptsInElement(el);
    },

    /**
     * Removes all scripts from an element (cleanup)
     * @param {HTMLElement} element - Element containing scripts to remove
     */
    removeScripts(element) {
        const scripts = element.getElementsByTagName('script');
        Array.from(scripts).forEach(script => {
            script.parentNode.removeChild(script);
        });
    }
};

export { ScriptService };