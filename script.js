// MODULE PATTERN : It returns an object. Here, different modules have
// been made that act as 'Stand-alone modules' which helps in separation
// of concerns for modules. A module to connect both budgetCOntroller & 
// uiController has been used, i.e, controller.

// USING IIFE (Immediately Invoked Function Expression)
// : It is an anonymous function wrapped in paranthesis.
// It is used for data privacy as it creates a new scope
// that is not accessible from global scope.


// Budget Controller
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function (type, desc, val) {

            var newItem, id;

            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            if (type === 'exp') {
                newItem = new Expense(id, desc, val);
            } else if (type === 'inc') {
                newItem = new Income(id, desc, val);
            }

            data.allItems[type].push(newItem);

            return newItem;

        }
    }

})();

// UI Controller
var uiController = (function () {

    var domStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value
            }
        },
        addListItem: function (obj, type) {

            var html, newHtml, element;

            // 1. Create HTML string with placeholder text.

            if (type === 'inc') {

                element = domStrings.incomeContainer;

                html = `<div class="item clearfix" id="income-%id%">
                <div class="item__description">%description%</div>
                <div class="right clearfix">
                    <div class="item__value">%value%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`;
            } else if (type === 'exp') {

                element = domStrings.expensesContainer;

                html = `<div class="item clearfix" id="expense-%id%"">
                <div class="item__description">%description%</div>
                <div class="right clearfix">
                    <div class="item__value">%value%</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`;
            }

            // 2. Replace the placeholder text with actual data.
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);


            // 3. Insert the HTML into DOM.
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },
        getDomStrings: function () {
            return domStrings;
        }
    }

})();


// Global Controller
var controller = (function (budgetCtrl, uiCtrl) {

    var setupEventListeners = function () {

        var dom = uiCtrl.getDomStrings();

        document.querySelector(dom.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {

            if (event.key === 13) {
                ctrlAddItem();
            }

        });

    }

    var ctrlAddItem = function () {

        var input, newItem;

        // 1. Get the field input data
        input = uiCtrl.getInput();

        // 2. Add item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value);

        // 3. Add new item to UI
        uiController.addListItem(newItem, input.type);

        // 4. Calculate the budget

        // 5. Display the budget
    }

    return {
        init: function () {
            setupEventListeners();
        }
    }

})(budgetController, uiController);

controller.init();