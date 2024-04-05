export const getHistory = async (token:string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/loadHistory`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(
        res => res.json()
    ).then(
        data => {
            return data
        }
    )
    return res
}
export const createNewChat = async(token:string) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/create_new_chat`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(
        res => res.json()
    ).then(
        data => {
            return data
        }
    )
    return res
}
export const updateChatLabel = async(chatId:string,input:string)=>{
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/update_label/${chatId}`,{
        method: 'POST',
        body: JSON.stringify({ label: input }),
        headers: {
            'Content-Type': 'application/json'
        }
    
    }).then(res=>res.json()).then(data=>{return data})
    return res
}