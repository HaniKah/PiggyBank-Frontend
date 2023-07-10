const auth = `Token ${process.env.REACT_APP_MINDEE_API_KEY}`
console.log("MINDEE API KEY:", auth)

// parseReceipt accepts a public url and returns parsed data in MINDEE format
async function parseReceipt(imageURL){
    let mindeeResponse = {}
    try {
        mindeeResponse = await fetch(
            "https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict",
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: auth
                },
                body: JSON.stringify({ 
                    document: imageURL
                }),
            }
        )
    } catch(e){
        console.log("ERROR: MINDEE responded with error", e)
        return 
    }
    
    console.log("INFO: MINDEE responded ok", mindeeResponse)
    const mindeeResponseBody = await mindeeResponse.json()
    console.log("INFO: MINDEE body is", mindeeResponseBody.document)

    return mindeeResponseBody.document
}

function convertMindeeResponseToTransaction(mindeeResponse) {
    const transaction = {
        category_name: mindeeResponse.inference.prediction.category.value,
        tran_description: mindeeResponse.inference.prediction.supplier_name.value,
        tran_amount: `${mindeeResponse.inference.prediction.total_amount.value}`,
        tran_sign: "DR", //DR (expense) or CR(income)
        tran_currency: mindeeResponse.inference.prediction.locale.country,
        tran_date: mindeeResponse.inference.prediction.date.value,
    }

    console.log("INFO: convertMindeeResponseToTransaction()", {transaction})

    return transaction
}

const saveTransaction = async (token, transaction) => {
    try {
        const res = await fetch(
            "https://piggybank-api.onrender.com/transaction/",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transaction),
            }
        );
        if (!res.ok) {
            console.log("ERROR: saveTransaction() not ok: ", res)
            return
        }
        console.log("OK: saveTransaction succeeded")
    } catch (error) {
        console.log("ERROR: saveTransaction() failed: ", error)
        return
    };
}

export default {
    parseReceipt: parseReceipt,
    convertMindeeResponseToTransaction: convertMindeeResponseToTransaction,
    saveTransaction: saveTransaction
}
