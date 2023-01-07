export const deleteTransactions = (id)=>{
    return ({
        type:"DELETE_TRANSACTION",
        payload:id
    });
}