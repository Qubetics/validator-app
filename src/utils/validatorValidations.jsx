import { toast } from "../components/Common/Toast/Toast";
import { MIN_BOND_AMOUNT } from "../constant";

export const handleNext = (values, activeStep, setActiveStep, bal, fee) => {
    switch (activeStep) {
        case 0:
            if (values?.name == '' || values?.name?.length < 3 || values?.name?.length > 25) {
                toast.error('Name should be min 3 & max 25 character long');
                return;
            }

            if (values?.details == '' || values?.details?.length < 10 || values?.details?.length > 60) {
                toast.error('Description should be min 10 & max 60 character long');
                return;
            }
            if (values?.website == '') {
                toast.error('Invalid Url');
                return;
            }
            if (values?.identity == '' || values?.identity?.length < 5 || values?.identity?.length > 20) {
                toast.error('Identity should be min 5 & max 20 character long');
                return;
            }
            if (values?.SecurityContact == '' || values?.SecurityContact?.length < 5 || values?.SecurityContact?.length > 20) {
                toast.error('Security contact should be min 5 & max 20 character long');
                return;
            }
            else {
                return setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        case 1:
            if (values?.Bond_Amount === '') {
                toast.error('Enter Bond Amount');
                return;
            }
            if (Number(bal) < Number(fee) || Number(bal) < Number(MIN_BOND_AMOUNT) + Number(fee)) {
                toast.error('Low wallet Balance');
                return;
            }
            if (Number(values?.Bond_Amount) < Number(MIN_BOND_AMOUNT)) {
                toast.error(`Bond amount should be equal or greater than ${MIN_BOND_AMOUNT} `);
                return;
            }
            if (Number(values?.Bond_Amount) > Number(bal)) {
                toast.error(`Stake Amount should be less than ${bal}`);
                return;
            }
            if (values?.Commission_Rate == '' || values?.Max_Rate == '' || values?.Max_Change_Rate == '') {
                toast.error('Enter commission percentage');
                return;
            }
            if (values?.Max_Rate < 0.05 || values?.Max_Rate > 1) {
                toast.error('Commission max rate should be between 0.05 to 1');
                return;
            }
            if (values?.Commission_Rate < 0.05 || values?.Commission_Rate > values?.Max_Rate || values?.Commission_Rate > 1) {
                toast.error(`Commission initial rate should be between 0.05 to ${values?.Max_Rate}`);
                return;
            }
            if (values?.Max_Change_Rate < 0.05 || values?.Max_Change_Rate > values?.Max_Rate || values?.Max_Change_Rate > 1) {
                toast.error(`Commission change rate should be between 0.05 to ${values?.Max_Rate}`);
                return;
            }
            else {
                return setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        default:
            return;
    }
}


export const bondMoreValidations = (e, setErrMsg, userBalance) => {
    let { name, value } = e.target
    if (name === 'Bond_Amount') {
        setErrMsg((prev) => ({ ...prev, amount: '' }))
        if (!value) {
            setErrMsg((prev) => ({ ...prev, amount: 'Enter bond amount' }))
            return;
        }
        if (Number(value) >= Number(userBalance)) {
            setErrMsg((prev) => ({ ...prev, amount: 'You have insufficient balance' }))
            return;
        }
        if (Number(value) <= 0) {
            setErrMsg((prev) => ({ ...prev, amount: 'Bonded amount must be greater than 0' }))
            return;
        }
    }
    if (name === 'Unbond_Amount') {
        setErrMsg((prev) => ({ ...prev, amount: '' }))
        if (!value) {
            setErrMsg((prev) => ({ ...prev, amount: 'Enter unbonding amount' }))
            return;
        }
        if (Number(value) >= Number(userBalance)) {
            setErrMsg((prev) => ({ ...prev, amount: 'You have insufficient bonded amount' }))
            return;
        }
        if (Number(value) <= 0) {
            setErrMsg((prev) => ({ ...prev, amount: 'unbonding amount must be greater than 0' }))
            return;
        }
    }
    else if (name === 'Mnemonics') {
        setErrMsg((prev) => ({ ...prev, mnemonics: '' }))
        if (!value) {
            setErrMsg((prev) => ({ ...prev, mnemonics: 'Enter mnemonics' }))
            return;
        }

    }
}