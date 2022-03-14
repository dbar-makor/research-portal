import React,{ useState }  from 'react';
import * as actionSnackBar from '../../../../../redux/SnackBar/action';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL, END_POINT } from '../../../../../utils/constants';
import ContractRowView from './ContractRow.view';

const ContractRow = (props) => {
  const dispatch = useDispatch();
  const { contract, clientName } = props;
  const [filterInvoices, setFilterInvoices] = useState(contract.invoices);
  const [open, setOpen] = useState(false);
	const calcYearlyCost = (amount, period) => {
		if (period === 'fully') {
			return amount;
		} else if (period === 'half') {
			return amount * 2;
		} else if (period === 'quarterly') {
			return amount * 3;
		} else if (period === 'monthly') {
			return amount * 12;
		}
	};
  const searchInvoice = (value) => {
    const debaunceSearch = setTimeout(() => {
      if (value !== '') {
        const filterInvoice = contract.invoices.filter(
          (i) => i.id.slice(0, 6).includes(value) || i.id.slice(0, 6).toUpperCase().includes(value),
        );
        setFilterInvoices(filterInvoice);
      } else {
        setFilterInvoices(contract.invoices);
      }
    }, 500);
    return () => clearTimeout(debaunceSearch);
  };

  const calcPaymentProgress = (invoices) => {
    let cnt = 0;
    if (invoices.length > 0) {
      invoices.forEach((invoice) => {
        if (invoice.status === 'approved') {
          cnt++;
        }
      });
      return ((cnt / invoices.length) * 100).toFixed();
    }
    return 0;
  };

  const openInvoices = () => {
    setOpen(!open);
  };

  const showInvoice = async (invoiceId) => {
    try {
      const res = await axios.get(`${BASE_URL}${END_POINT.INVOICE}/pdf/${invoiceId}`, {
        headers: { Accept: 'application/pdf' },
      });

      if (res.status === 200) {
        const pdfString = res.data.pdf;

        const byteCharacters = window.atob(pdfString);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const file = new Blob([byteArray], { type: 'application/pdf;base64' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);

        dispatch(actionSnackBar.setSnackBar('success', 'Contract successfully created', 2000));
      }
    } catch (err) {
      dispatch(actionSnackBar.setSnackBar('error', 'Failed to create a invoice', 2000));
    }
  };

  return <ContractRowView
    contract={contract}
    openInvoices={openInvoices}
    clientName={clientName}
    calcPaymentProgress={calcPaymentProgress}
    calcYearlyCost={calcYearlyCost}
    filterInvoices={filterInvoices}
    showInvoice={showInvoice}
    searchInvoice={searchInvoice}
  > </ContractRowView>;
};

ContractRow.displayName = 'ContractRow';
ContractRow.defaultProps = {};

export default React.memo(ContractRow);
