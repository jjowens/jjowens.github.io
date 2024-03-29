let romanNumberService = (function RomanNumberService() {
    let listOfRomanNumbers = []
    let unitTypes = [];

    function init() {

        unitTypes.push("Blank");
        unitTypes.push("Single");
        unitTypes.push("Tens");
        unitTypes.push("Hundreds");
        unitTypes.push("Thousands");

        listOfRomanNumbers.push(createRomanNumber(0,"Single", ""));
        listOfRomanNumbers.push(createRomanNumber(1,"Single", "I"));
        listOfRomanNumbers.push(createRomanNumber(2,"Single", "II"));
        listOfRomanNumbers.push(createRomanNumber(3,"Single", "III"));
        listOfRomanNumbers.push(createRomanNumber(4,"Single", "IV"));
        listOfRomanNumbers.push(createRomanNumber(5,"Single", "V"));
        listOfRomanNumbers.push(createRomanNumber(6,"Single", "VI"));
        listOfRomanNumbers.push(createRomanNumber(7,"Single", "VII"));
        listOfRomanNumbers.push(createRomanNumber(8,"Single", "VIII"));
        listOfRomanNumbers.push(createRomanNumber(9,"Single", "IX"));

        listOfRomanNumbers.push(createRomanNumber(10,"Tens", "X"));
        listOfRomanNumbers.push(createRomanNumber(20,"Tens", "XX"));
        listOfRomanNumbers.push(createRomanNumber(30,"Tens", "XXX"));
        listOfRomanNumbers.push(createRomanNumber(40,"Tens", "XL"));
        listOfRomanNumbers.push(createRomanNumber(50,"Tens", "L"));
        listOfRomanNumbers.push(createRomanNumber(60,"Tens", "LX"));
        listOfRomanNumbers.push(createRomanNumber(70,"Tens", "LXX"));
        listOfRomanNumbers.push(createRomanNumber(80,"Tens", "LXXX"));
        listOfRomanNumbers.push(createRomanNumber(90,"Tens", "XC"));

        listOfRomanNumbers.push(createRomanNumber(100,"Hundreds", "C"));
        listOfRomanNumbers.push(createRomanNumber(200,"Hundreds", "CC"));
        listOfRomanNumbers.push(createRomanNumber(300,"Hundreds", "CCC"));
        listOfRomanNumbers.push(createRomanNumber(400,"Hundreds", "CD"));
        listOfRomanNumbers.push(createRomanNumber(500,"Hundreds", "D"));
        listOfRomanNumbers.push(createRomanNumber(600,"Hundreds", "DC"));
        listOfRomanNumbers.push(createRomanNumber(700,"Hundreds", "DCC"));
        listOfRomanNumbers.push(createRomanNumber(800,"Hundreds", "DCCC"));
        listOfRomanNumbers.push(createRomanNumber(900,"Hundreds", "CM"));

        listOfRomanNumbers.push(createRomanNumber(1000,"Thousands", "M"));
        listOfRomanNumbers.push(createRomanNumber(2000,"Thousands", "MM"));
        listOfRomanNumbers.push(createRomanNumber(3000,"Thousands", "MMM"));
        listOfRomanNumbers.push(createRomanNumber(4000,"Thousands", "MMMM"));
    }

    init();

    function createRomanNumber(number, unitType, romanLetter) {
        return {
            "number": number,
            "numberString": number.toString(),
            "unittype": unitType,
            "romanletter": romanLetter
        };
    }

    function generateRomanNumbers(requiredTiles, startRange, endRange) {
        let arr = []
        let listOfRandomNumbers = [];

        // CHECK IF END RANGE IS UNDER OR MATCHES REQUIRED SET OF NUMBERS
        if (endRange <= requiredTiles) {
            requiredTiles = endRange;
            for (let i = 1; i <= requiredTiles; i++) {
                var romanNumber = listOfRomanNumbers.filter(item => item.number === i)[0];

                if (romanNumber === undefined || romanNumber === null) {
                    romanNumber = concatenateRomanNumber(i);
                }

                arr.push(romanNumber);
            }
        } else {
            for (let i = 1; i <= requiredTiles; i++) {
                var randomNumber = getUniqueNumbers(listOfRandomNumbers,startRange, endRange);
                listOfRandomNumbers.push(randomNumber);

                var romanNumber = listOfRomanNumbers.filter(item => item.number === randomNumber)[0];

                if (romanNumber === undefined || romanNumber === null) {
                    romanNumber = concatenateRomanNumber(randomNumber);
                }

                arr.push(romanNumber);
            }
        }


        return arr;
    }

    function getRandomNumber(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function getUniqueNumbers(currentList, min, max) { // min and max included
        let randomNumber = 0;
        let notFound = false;
        while (!notFound) {
            randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

            let idx = currentList.indexOf(randomNumber);

            if (idx === -1) {
                notFound = true;
            }
        }

        return randomNumber;
    }

    function concatenateRomanNumber(number) {
        let numberString = number.toString();
        let unitType = "Singles";

        if (numberString.length === 4) {
            unitType = "Thousands";
        } else if (numberString.length === 3) {
            unitType = "Hundreds";
        } else if (numberString.length === 2) {
            unitType = "Tens"
        }

        let lengthCounter = numberString.length;
        let tempUnitType = unitType;
        let romanLetters = ""
        for (let i = 0; i < numberString.length; i++) {
            tempUnitType = unitTypes[lengthCounter];
            let tempNumber = getFullNumber(numberString.charAt(i), lengthCounter);

            let tempRomanNumber = listOfRomanNumbers.filter(item => item.number === tempNumber && item.unittype === tempUnitType)[0];

            if (tempRomanNumber != null) {
                romanLetters += tempRomanNumber.romanletter;
            } else {
                romanLetters += "";
            }

            lengthCounter -= 1;
        }

        return createRomanNumber(number, unitType, romanLetters);
    }

    function getFullNumber(numberString, lengthCounter) {
        let number = parseInt(numberString);

        if (lengthCounter === 4) {
            number = number * 1000;
        }

        if (lengthCounter === 3) {
            number = number * 100;
        }

        if (lengthCounter === 2) {
            number = number * 10;
        }

        if (lengthCounter === 1) {
            number = number * 1;
        }

        return number;
    }

    return {
        generateRomanNumbers: generateRomanNumbers,
        concatenateRomanNumber: concatenateRomanNumber,
        createRomanNumber: createRomanNumber
    }

});

export default { romanNumberService }