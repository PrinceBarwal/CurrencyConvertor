import { LightningElement } from 'lwc';

export default class ConvertCurrency extends LightningElement {
    showOutput = false;
    convertedValue = "";
    toCurrency = "";
    fromCurrency = "";
    enteredAmount = '';
    currencyOptions = [];

    connectedCallback(){
        this.fetchSymbols();
    }

    changeHandler(event){
        let{name, value} = event.target;
        if(name === 'amount'){
            this.enteredAmount = value;
        }
        if(name === 'fromCurr'){
            this.fromCurrency = value;
        }
        if(name === 'toCurr'){
            this.toCurrency = value;
        }


    }

    clickHandler(){
        console.log('Click called');
        this.conversion();
    }

    async conversion(){
        console.log('Inside conversion function');

        let endpoint = `https://api.frankfurter.dev/v1/latest?base=${this.fromCurrency}&symbols=${this.toCurrency}`;
        try{
            let response = await fetch(endpoint);
            console.log('response',response);
            if(!response.ok){
                throw new Error('network response was not OK');
            }
            const data = await response.json();
            console.log('data',data);
            this.convertedValue = (this.enteredAmount * data.rates[this.toCurrency]).toFixed(2);
            this.showOutput = true;
            console.log('convertedValue',convertedValue);


        }
        catch(error){
            console.log(error);
        }
    }

    async fetchSymbols(){
        console.log('iside fetch method');
        let url = `https://api.frankfurter.dev/v1/currencies`;
        try{
            let response = await fetch(url);
            console.log('response',response);
            if(!response.ok){
                throw new Error('network response was not OK');
            }
            const data = await response.json();
            console.log('data',data);
            let options = [];
            for(let symbol in data){
                options = [...options, {label: symbol, value: symbol}]
            }
            console.log('options',options);
            this.currencyOptions = [...options];
            console.log('this.currencyOptions',this.currencyOptions);

        }
        catch(error){
            console.log(error);
        }
    }
}