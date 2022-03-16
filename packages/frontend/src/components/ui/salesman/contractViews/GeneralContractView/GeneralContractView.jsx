import React,{ useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChosenCompany } from '../../../../../redux/companies/chosenCompanySlice';
import GeneralContractViewView from './GeneralContractView.view';

const GeneralContractView = () => {
	const [step, setStep] = useState(1);
	const chosenCompany = useSelector(selectChosenCompany);
	const [contractCopy, setContractCopy] = useState({});
  return <GeneralContractViewView
    chosenCompany={chosenCompany}
    step={step}
    setStep={setStep}
    setContractCopy={setContractCopy}
    contractCopy={contractCopy}
  ></GeneralContractViewView>;
};

GeneralContractView.displayName = 'GeneralContractView';
GeneralContractView.defaultProps = {};

export default React.memo(GeneralContractView);
