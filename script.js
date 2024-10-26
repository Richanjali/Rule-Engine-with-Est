let rules = [];

// Add rule function
function addRule() {
    const ruleInput = document.getElementById("rule-input").value;
    if (ruleInput.trim()) {
        rules.push(ruleInput);
        updateRulesList();
        document.getElementById("rule-input").value = '';
    } else {
        alert("Please enter a valid rule.");
    }
}

// Update rule list display
function updateRulesList() {
    const rulesList = document.getElementById("rules-list");
    rulesList.innerHTML = '';
    rules.forEach((rule, index) => {
        rulesList.innerHTML += `<p>Rule ${index + 1}: ${rule}</p>`;
    });
}

// Evaluate rules function
function evaluateRules() {
    const age = parseInt(document.getElementById("age").value, 10);
    const department = document.getElementById("department").value;
    const experience = parseInt(document.getElementById("experience").value, 10);

    let result = rules.every(rule => evaluateRule(rule, { age, department, experience }));
    document.getElementById("result").innerText = result ? "Matched" : "Not Matched";
}

// Evaluate individual rule
function evaluateRule(rule, data) {
    try {
        // Simple replacement-based evaluation
        let condition = rule.replace(/age/g, data.age)
                            .replace(/department/g, `"${data.department}"`)
                            .replace(/experience/g, data.experience);
        return eval(condition);  // WARNING: Eval should be used cautiously in production!
    } catch (e) {
        console.error("Error evaluating rule:", e);
        return false;
    }
}
