$(document).ready(function () {

    var amountLeft;
    var percentage = $("#bgt-header");


    $("#new-budget-form").on("click", "#budgetBtn", function () {
        event.preventDefault();
        var totalBudget = $('#setBudget').val().trim();
        saveBudget({
            budgetSet: totalBudget,
            budgetAvail: totalBudget
        });
        showBudget(totalBudget);
        percentage.html("100%");
    });

    $("#new-cost-form").on("click", "#costBtn", function () {
        event.preventDefault();
        var totalCost = $('#budgetMinus').val().trim();
        calcBudgetAvail(totalCost)

    });


    function saveBudget(amount) {
        $.post("/api/budgets", amount);
    }


    function calcBudgetAvail(expense) {
        $.get("/api/budgets", function (data) {
            budget = data;
            amountTotal = budget[0].budgetSet
            amountLeft = budget[0].budgetAvail - expense;
            itemID = budget[0].id;
            saveBudget({
                budgetSet: budget[0].budgetSet,
                budgetAvail: amountLeft
            });
            refreshBudget(itemID);
            showBudget(amountLeft)
            budgetPercentage(amountTotal, amountLeft)

        });
    }

    function refreshBudget(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/budgets/" + id
        });
    };

    function showBudget(amount) {
        $("#availBudget").attr('value', amount);
    }

    function budgetPercentage(x1, x2) {
        var budPercent = parseInt((x2 / x1) * 100);
        budPercent = budPercent + "%";
        percentage.html(budPercent);
    }






});