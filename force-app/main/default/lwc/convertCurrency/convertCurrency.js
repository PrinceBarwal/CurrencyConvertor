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
            this.toCurrenct = value;
        }


    }

    clickHandler(){

    }

    async fetchSymbols(){
        let url = `https://api.frankfurter.dev/v1/currencies`;
        try{
            let response = await fetch(url);
            if(!response.ok){
                throw new Error('network response was not OK');
            }
            const data = await response.JSON();
            let options = [];
            for(let symbol in data){
                options = [...options, {label: symbol, value: symbol}]
            }
            this.currencyOptions = [...options];

        }
        catch(error){
            console.log(error);
        }
    }
}