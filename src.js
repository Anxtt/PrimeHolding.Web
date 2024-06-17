document.addEventListener('DOMContentLoaded', function () {
    const carType = document.getElementById('carType');
    const carValue = document.getElementById('carValue');
    const carValueRange = document.getElementById('carValueRange');

    const leasePeriod = document.getElementById('leasePeriod');
    const leasePeriodRange = document.getElementById('leasePeriodRange');
    const totalLeasingDisplay = document.getElementById('totalLeasingDisplay');

    const downPayment = document.getElementById('downPayment');
    const downPaymentRange = document.getElementById('downPaymentRange');
    const downPaymentDisplay = document.getElementById('downPaymentDisplay');

    const monthlyInstallmentDisplay = document.getElementById('monthlyInstallmentDisplay');
    const interestRateDisplay = document.getElementById('interestRateDisplay');

    const carValueMin = 10000;
    const carValueMax = 200000;

    const downPaymentMin = 10;
    const downPaymentMax = 50;

    function calculateLeasingDetails() {
        const carValueNum = parseFloat(carValue.value);
        const downPaymentPercent = parseFloat(downPayment.value);
        const numberOfPayments = parseFloat(leasePeriod.value);
        const interestRate = carType.value === "new" ? 2.99 : 3.7;
        const downPaymentAmountNum = (downPaymentPercent / 100) * carValueNum;

        const difference = carValueNum - downPaymentAmountNum;
        const monthlyRate = interestRate / 100 / 12;

        const monthlyInstallmentAmount = (difference * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

        const totalCost = monthlyInstallmentAmount * numberOfPayments + downPaymentAmountNum;

        totalLeasingDisplay.textContent = `Total Leasing Cost: €${totalCost.toFixed(2)}`;
        downPaymentDisplay.textContent = `Down Payment: €${downPaymentAmountNum.toFixed(2)}`;
        monthlyInstallmentDisplay.textContent = `Monthly Installment: €${monthlyInstallmentAmount.toFixed(2)}`;
        interestRateDisplay.textContent = `Interest rate: ${interestRate}%`;
    }

    function validateCarValue() {
        let value = parseFloat(carValue.value);

        if (value < carValueMin) value = carValueMin;
        if (value > carValueMax) value = carValueMax;
        
        carValue.value = value;
    }

    function validateDownPayment() {
        let value = parseFloat(downPayment.value);

        if (value < downPaymentMin) value = downPaymentMin;
        if (value > downPaymentMax) value = downPaymentMax;
        
        downPayment.value = value;
    }

    carValue.addEventListener('input', function () {
        validateCarValue();

        carValueRange.value = carValue.value;
        calculateLeasingDetails();
    });

    carValueRange.addEventListener('input', function () {
        carValue.value = carValueRange.value;
        calculateLeasingDetails();
    })

    // leasePeriod.addEventListener('input', function() {
    //     leasePeriodRange.value = leasePeriod.value;
    //     calculateLeasingDetails();
    // });

    // leasePeriodRange.addEventListener('input', function() {
    //     leasePeriod.value = leasePeriodRange.value;
    //     calculateLeasingDetails();
    // });

    downPayment.addEventListener('input', function () {
        validateDownPayment();

        downPaymentRange.value = downPayment.value;
        calculateLeasingDetails();
    });

    downPaymentRange.addEventListener('input', function () {    
        downPayment.value = downPaymentRange.value;
        calculateLeasingDetails();
    });

    carType.addEventListener('change', calculateLeasingDetails);

    calculateLeasingDetails();
});