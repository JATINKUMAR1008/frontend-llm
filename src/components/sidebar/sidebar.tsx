"use client"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiLoader2Line } from "react-icons/ri";
import { PiPencilSimpleLineThin } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/app/reducers/store";
import { changeSidebarState, setCurrentChat } from "@/app/reducers/slice/global/global.slice";
import { fetchHistory, logOut, removeChat } from "@/app/reducers/slice/global/global.action";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "../ui/use-toast";
import { Label } from "@radix-ui/react-label";
interface Iprops {
    chatId?: string
    chatHistory?: IChat[]
    open: boolean
    setOpen: (open: boolean) => void
}
interface IChat {
    chat_id: string
    label: string
}
export default function Sidebar() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const chatHistory = useAppSelector(state => state.global.chatHistory)
    const currentChat = useAppSelector(state => state.global.currentChat)
    const { sidebarOpen } = useAppSelector(state => state.global)
    const pathname = usePathname()
    const chatOn = pathname.split("/")[2]


    const handleDeleteChat = (chatId: string) => {
        dispatch(removeChat(chatId));
        router.push("/")
        toast({
            title: "Delete",
            description: "Chat deleted successfully."
        })
        dispatch(fetchHistory())

    };

    const redirectPage = async () => {
        await fetch('/api/auth/logout')
        router.push('/auth/login')
    }
    useEffect(() => {
        dispatch(fetchHistory())
    }, [])
    useEffect(() => {
        if (chatHistory.length > 0) {
            const label = chatHistory.find(chat => chat.chat_id === chatOn)?.label
            dispatch(setCurrentChat({ id: chatOn, label: label }))
        }
    }, [chatOn, chatHistory])
    return (
        <>

            <div className="w-full h-screen hidden  py-2 md:flex flex-col item-center max-w-[250px]  bg-[#1B1B20] overflow-auto border-r-[1px] border-neutral-600">
                <div className="p-4">
                    <svg width="164" height="40" viewBox="0 0 164 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.062 8.4771e-06L22.6987 2.69948L22.7088 2.68926L40.0775 19.9854L37.3685 22.6887L37.3858 22.706L20.0557 40L17.3473 37.2972L17.33 37.3144L0 20.0204L20.062 8.4771e-06ZM18.3404 36.3406L20.0557 38.0523L35.434 22.706L33.736 21.0114L31.062 23.6798L31.0448 23.6626L18.3404 36.3406ZM36.4099 21.6977L38.1247 19.9864L22.7302 4.65628L21.0316 6.35134L34.2405 19.5327L34.7299 20.0196L34.7291 20.0204L36.4099 21.6977ZM21.7568 9.02275L20.0557 7.32519L10.0253 17.3348L11.7406 19.0465L19.5647 11.2388L19.5662 11.2372L19.5678 11.2356L21.7568 9.02275ZM20.0557 12.6964L15.4077 17.3348L17.123 19.0465L19.0971 17.0765L19.0799 17.0593L21.7538 14.3909L20.0557 12.6964ZM20.073 18.0504L18.0989 20.0204L20.0482 21.9656L22.0284 20.0017L20.073 18.0504ZM22.9901 20.9896L21.0241 22.9395L21.0316 22.947L18.3577 25.6154L20.0557 27.3099L24.7006 22.6747L22.9901 20.9896ZM19.0693 22.9365L14.4318 18.3086L12.7165 20.0204L17.3487 24.643L19.0693 22.9365ZM9.04946 18.3086L7.33414 20.0204L17.3473 30.0127L19.0626 28.301L9.04946 18.3086ZM3.66707 18.3086L1.95175 20.0204L17.33 35.3667L19.0454 33.6549L3.66707 18.3086ZM20.0557 32.6811L30.0689 22.6887L29.2143 21.836L28.3425 20.988L21.0144 28.301L21.0316 28.3182L18.3577 30.9866L20.0557 32.6811ZM31.0558 21.7039L30.184 20.8559L29.3295 20.0031L29.3497 19.9829L26.028 16.7086L21.0316 11.7225L22.7305 10.0272L32.7593 20.0039L31.0558 21.7039ZM25.0552 17.6854L27.3777 20.0031L25.6796 21.6977L21.0489 17.0765L22.7328 15.3961L25.0552 17.6854ZM4.64295 17.3348L6.35826 19.0465L19.5647 5.86757L19.5662 5.86602L19.5678 5.86442L21.7289 3.67978L20.0494 1.96027L4.64295 17.3348Z" fill="#C05037"></path><path d="M63.1211 7.69562V11.8297H56.0386V31.801H51.8893V11.8297H44.7668V7.69562H63.1211ZM77.3262 25.2571H63.9162C64.1479 25.7852 64.4819 26.2556 64.9185 26.6684C65.404 27.1521 65.9452 27.5138 66.5421 27.7535C67.1434 27.9976 67.7782 28.1196 68.4464 28.1196C69.3907 28.1196 70.2304 27.8999 70.9653 27.4606L75.2883 29.1848C74.4554 30.1478 73.4531 30.9001 72.2816 31.4415C71.1056 31.9785 69.8272 32.247 68.4464 32.247C67.1769 32.247 65.9898 32.0118 64.8851 31.5414C63.7804 31.0709 62.8115 30.423 61.9786 29.5975C61.1501 28.772 60.4997 27.8067 60.0275 26.7017C59.5554 25.601 59.3193 24.4316 59.3193 23.1934C59.3193 21.9285 59.5554 20.7458 60.0275 19.6451C60.4997 18.5445 61.1501 17.5814 61.9786 16.7559C62.8115 15.926 63.7804 15.2758 64.8851 14.8054C65.9898 14.335 67.1769 14.0998 68.4464 14.0998C69.7114 14.0998 70.8963 14.335 72.001 14.8054C73.1101 15.2758 74.079 15.926 74.9075 16.7559C75.736 17.5814 76.3863 18.5445 76.8585 19.6451C77.3307 20.7458 77.5668 21.9285 77.5668 23.1934C77.5668 23.9256 77.4866 24.6135 77.3262 25.2571ZM68.4464 18.2338C67.11 18.2338 65.9341 18.7153 64.9185 19.6784C64.4819 20.1178 64.1479 20.6015 63.9162 21.1297H72.9698C72.7382 20.6015 72.4041 20.1178 71.9676 19.6784C71.001 18.7153 69.8272 18.2338 68.4464 18.2338ZM83.6136 15.8905C84.2595 15.3624 84.9923 14.9275 85.8119 14.5857C86.627 14.2396 87.5535 14.0665 88.5914 14.0665V18.2005C87.2105 18.2005 86.0346 18.6821 85.0635 19.6451C84.0969 20.657 83.6136 21.8287 83.6136 23.1601V31.801H79.471V14.5524H83.6136V15.8905ZM94.6383 15.8905C95.2841 15.3624 96.0169 14.9275 96.8365 14.5857C97.6517 14.2396 98.5782 14.0665 99.6161 14.0665V18.2005C98.2352 18.2005 97.0592 18.6821 96.0882 19.6451C95.1216 20.657 94.6383 21.8287 94.6383 23.1601V31.801H90.4957V14.5524H94.6383V15.8905ZM114.028 14.5524H118.178V31.801H114.028V23.1934C114.028 21.8176 113.545 20.6459 112.578 19.6784C111.607 18.7153 110.431 18.2338 109.05 18.2338C108.382 18.2338 107.743 18.3603 107.133 18.6133C106.523 18.8662 105.988 19.2213 105.529 19.6784C104.558 20.6459 104.073 21.8176 104.073 23.1934C104.073 24.547 104.558 25.7053 105.529 26.6684C105.988 27.1521 106.523 27.5138 107.133 27.7535C107.743 27.9976 108.382 28.1196 109.05 28.1196C109.741 28.1196 110.362 28.0042 110.915 27.7734L112.405 31.4548C111.344 31.983 110.111 32.247 108.703 32.247C107.438 32.247 106.269 32.0118 105.195 31.5414C104.126 31.0709 103.2 30.423 102.416 29.5975C101.632 28.772 101.021 27.8067 100.585 26.7017C100.148 25.601 99.9301 24.4316 99.9301 23.1934C99.9301 21.9285 100.148 20.7458 100.585 19.6451C101.021 18.5445 101.632 17.5814 102.416 16.7559C103.2 15.926 104.126 15.2758 105.195 14.8054C106.269 14.335 107.438 14.0998 108.703 14.0998C109.834 14.0998 110.837 14.2728 111.71 14.619C112.587 14.9652 113.36 15.4023 114.028 15.9305V14.5524ZM130.619 7.69562C132.276 7.69562 133.841 8.01294 135.316 8.64758C136.79 9.27779 138.075 10.1366 139.171 11.2239C140.267 12.3156 141.131 13.596 141.764 15.065C142.396 16.534 142.712 18.0962 142.712 19.7516C142.712 21.4026 142.396 22.9626 141.764 24.4316C141.131 25.9006 140.267 27.181 139.171 28.2727C138.075 29.3645 136.79 30.2255 135.316 30.8557C133.841 31.4859 132.276 31.801 130.619 31.801H126.329L128.026 27.6669H130.619C131.679 27.6669 132.692 27.4672 133.659 27.0678C134.625 26.6639 135.49 26.0959 136.251 25.3636C136.986 24.6047 137.556 23.7481 137.962 22.7939C138.363 21.8442 138.563 20.8301 138.563 19.7516C138.563 18.6954 138.363 17.6835 137.962 16.716C137.556 15.7529 136.986 14.8942 136.251 14.1397C135.49 13.403 134.625 12.8349 133.659 12.4355C132.692 12.0316 131.679 11.8297 130.619 11.8297H124.739V31.801H120.596V7.69562H130.619ZM164 7.69562L154.806 19.7516L164 31.801H158.815L152.214 23.1601L145.619 31.801H140.434L149.628 19.7516L140.434 7.69562H145.619L152.214 16.3432L158.815 7.69562H164Z" fill="#C05037"></path></svg>
                </div>
                <div className="px-4">
                    <Button variant="default" className="w-full sticky bg-[#313035] hover:bg-[#3d3c40]" onClick={() => { router.push("/"); dispatch(setCurrentChat("")) }}>
                        <PiPencilSimpleLineThin size={20} className="mr-2" />
                        Create new chat
                    </Button>
                </div>

                {chatHistory && <div className="mt-5 flex flex-col items-center text-muted max-h-[calc(90%-50px)] h-full overflow-auto scrollbar-custom gap-1">
                    <h1 className="w-full text-left text-xs text-muted mb-5 px-3">History</h1>
                    {
                        chatHistory.length > 0 ? chatHistory.map((item, index) => (
                            <div key={index} className={item?.chat_id === currentChat.id ? "flex item-center justify-center w-full p-3 px-4 min-h-11 cursor-pointer bg-[#313035] text-sm  overflow-hidden text-ellipsis whitespace-nowrap" : "flex item-center justify-center w-full p-3 cursor-pointer min-h-11 hover:bg-[#313035] text-sm  overflow-hidden text-ellipsis whitespace-nowrap"}>
                                <p key={index} className={item?.chat_id === currentChat.id ? "w-full cursor-pointer bg-[#313035] text-sm  overflow-hidden text-ellipsis whitespace-nowrap" : "w-full cursor-pointer hover:bg-[#313035] text-sm  overflow-hidden text-ellipsis whitespace-nowrap"} onClick={() => { router.push(`/chat/${item.chat_id}`); dispatch(setCurrentChat({ id: item.chat_id, label: item.label })) }}>
                                    {item.label}
                                </p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 text-gray-700 hover:text-red-700"
                                    onClick={() => handleDeleteChat(item?.chat_id)}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </div>
                        )) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <RiLoader2Line size={20} className="animate-spin text-neutral-300" />
                            </div>

                        )
                    }
                </div>}
                <div className="h-[50px] w-full px-3 py-2">
                    <Button variant="default" className="w-full sticky bg-[#313035] hover:bg-[#3d3c40]" onClick={() => { redirectPage() }}>
                        <IoIosLogOut size={20} className="mr-2" />
                        Log Out
                    </Button>
                </div>
            </div>
            <div className={sidebarOpen ? "flex relative lg:hidden left-0 min-w-[250px] items-center gap-2   z-20 h-screen duration-200 ease-in-out" : "flex lg:hidden relative left-[-310px] w-0 items-center gap-2  z-20 h-screen duration-200 ease-in-out"}>
                <div className="py-2 flex-col bg-[#1B1B20] w-full h-screen ">
                    <div className="p-4">
                        <svg width="164" height="40" viewBox="0 0 164 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.062 8.4771e-06L22.6987 2.69948L22.7088 2.68926L40.0775 19.9854L37.3685 22.6887L37.3858 22.706L20.0557 40L17.3473 37.2972L17.33 37.3144L0 20.0204L20.062 8.4771e-06ZM18.3404 36.3406L20.0557 38.0523L35.434 22.706L33.736 21.0114L31.062 23.6798L31.0448 23.6626L18.3404 36.3406ZM36.4099 21.6977L38.1247 19.9864L22.7302 4.65628L21.0316 6.35134L34.2405 19.5327L34.7299 20.0196L34.7291 20.0204L36.4099 21.6977ZM21.7568 9.02275L20.0557 7.32519L10.0253 17.3348L11.7406 19.0465L19.5647 11.2388L19.5662 11.2372L19.5678 11.2356L21.7568 9.02275ZM20.0557 12.6964L15.4077 17.3348L17.123 19.0465L19.0971 17.0765L19.0799 17.0593L21.7538 14.3909L20.0557 12.6964ZM20.073 18.0504L18.0989 20.0204L20.0482 21.9656L22.0284 20.0017L20.073 18.0504ZM22.9901 20.9896L21.0241 22.9395L21.0316 22.947L18.3577 25.6154L20.0557 27.3099L24.7006 22.6747L22.9901 20.9896ZM19.0693 22.9365L14.4318 18.3086L12.7165 20.0204L17.3487 24.643L19.0693 22.9365ZM9.04946 18.3086L7.33414 20.0204L17.3473 30.0127L19.0626 28.301L9.04946 18.3086ZM3.66707 18.3086L1.95175 20.0204L17.33 35.3667L19.0454 33.6549L3.66707 18.3086ZM20.0557 32.6811L30.0689 22.6887L29.2143 21.836L28.3425 20.988L21.0144 28.301L21.0316 28.3182L18.3577 30.9866L20.0557 32.6811ZM31.0558 21.7039L30.184 20.8559L29.3295 20.0031L29.3497 19.9829L26.028 16.7086L21.0316 11.7225L22.7305 10.0272L32.7593 20.0039L31.0558 21.7039ZM25.0552 17.6854L27.3777 20.0031L25.6796 21.6977L21.0489 17.0765L22.7328 15.3961L25.0552 17.6854ZM4.64295 17.3348L6.35826 19.0465L19.5647 5.86757L19.5662 5.86602L19.5678 5.86442L21.7289 3.67978L20.0494 1.96027L4.64295 17.3348Z" fill="#C05037"></path><path d="M63.1211 7.69562V11.8297H56.0386V31.801H51.8893V11.8297H44.7668V7.69562H63.1211ZM77.3262 25.2571H63.9162C64.1479 25.7852 64.4819 26.2556 64.9185 26.6684C65.404 27.1521 65.9452 27.5138 66.5421 27.7535C67.1434 27.9976 67.7782 28.1196 68.4464 28.1196C69.3907 28.1196 70.2304 27.8999 70.9653 27.4606L75.2883 29.1848C74.4554 30.1478 73.4531 30.9001 72.2816 31.4415C71.1056 31.9785 69.8272 32.247 68.4464 32.247C67.1769 32.247 65.9898 32.0118 64.8851 31.5414C63.7804 31.0709 62.8115 30.423 61.9786 29.5975C61.1501 28.772 60.4997 27.8067 60.0275 26.7017C59.5554 25.601 59.3193 24.4316 59.3193 23.1934C59.3193 21.9285 59.5554 20.7458 60.0275 19.6451C60.4997 18.5445 61.1501 17.5814 61.9786 16.7559C62.8115 15.926 63.7804 15.2758 64.8851 14.8054C65.9898 14.335 67.1769 14.0998 68.4464 14.0998C69.7114 14.0998 70.8963 14.335 72.001 14.8054C73.1101 15.2758 74.079 15.926 74.9075 16.7559C75.736 17.5814 76.3863 18.5445 76.8585 19.6451C77.3307 20.7458 77.5668 21.9285 77.5668 23.1934C77.5668 23.9256 77.4866 24.6135 77.3262 25.2571ZM68.4464 18.2338C67.11 18.2338 65.9341 18.7153 64.9185 19.6784C64.4819 20.1178 64.1479 20.6015 63.9162 21.1297H72.9698C72.7382 20.6015 72.4041 20.1178 71.9676 19.6784C71.001 18.7153 69.8272 18.2338 68.4464 18.2338ZM83.6136 15.8905C84.2595 15.3624 84.9923 14.9275 85.8119 14.5857C86.627 14.2396 87.5535 14.0665 88.5914 14.0665V18.2005C87.2105 18.2005 86.0346 18.6821 85.0635 19.6451C84.0969 20.657 83.6136 21.8287 83.6136 23.1601V31.801H79.471V14.5524H83.6136V15.8905ZM94.6383 15.8905C95.2841 15.3624 96.0169 14.9275 96.8365 14.5857C97.6517 14.2396 98.5782 14.0665 99.6161 14.0665V18.2005C98.2352 18.2005 97.0592 18.6821 96.0882 19.6451C95.1216 20.657 94.6383 21.8287 94.6383 23.1601V31.801H90.4957V14.5524H94.6383V15.8905ZM114.028 14.5524H118.178V31.801H114.028V23.1934C114.028 21.8176 113.545 20.6459 112.578 19.6784C111.607 18.7153 110.431 18.2338 109.05 18.2338C108.382 18.2338 107.743 18.3603 107.133 18.6133C106.523 18.8662 105.988 19.2213 105.529 19.6784C104.558 20.6459 104.073 21.8176 104.073 23.1934C104.073 24.547 104.558 25.7053 105.529 26.6684C105.988 27.1521 106.523 27.5138 107.133 27.7535C107.743 27.9976 108.382 28.1196 109.05 28.1196C109.741 28.1196 110.362 28.0042 110.915 27.7734L112.405 31.4548C111.344 31.983 110.111 32.247 108.703 32.247C107.438 32.247 106.269 32.0118 105.195 31.5414C104.126 31.0709 103.2 30.423 102.416 29.5975C101.632 28.772 101.021 27.8067 100.585 26.7017C100.148 25.601 99.9301 24.4316 99.9301 23.1934C99.9301 21.9285 100.148 20.7458 100.585 19.6451C101.021 18.5445 101.632 17.5814 102.416 16.7559C103.2 15.926 104.126 15.2758 105.195 14.8054C106.269 14.335 107.438 14.0998 108.703 14.0998C109.834 14.0998 110.837 14.2728 111.71 14.619C112.587 14.9652 113.36 15.4023 114.028 15.9305V14.5524ZM130.619 7.69562C132.276 7.69562 133.841 8.01294 135.316 8.64758C136.79 9.27779 138.075 10.1366 139.171 11.2239C140.267 12.3156 141.131 13.596 141.764 15.065C142.396 16.534 142.712 18.0962 142.712 19.7516C142.712 21.4026 142.396 22.9626 141.764 24.4316C141.131 25.9006 140.267 27.181 139.171 28.2727C138.075 29.3645 136.79 30.2255 135.316 30.8557C133.841 31.4859 132.276 31.801 130.619 31.801H126.329L128.026 27.6669H130.619C131.679 27.6669 132.692 27.4672 133.659 27.0678C134.625 26.6639 135.49 26.0959 136.251 25.3636C136.986 24.6047 137.556 23.7481 137.962 22.7939C138.363 21.8442 138.563 20.8301 138.563 19.7516C138.563 18.6954 138.363 17.6835 137.962 16.716C137.556 15.7529 136.986 14.8942 136.251 14.1397C135.49 13.403 134.625 12.8349 133.659 12.4355C132.692 12.0316 131.679 11.8297 130.619 11.8297H124.739V31.801H120.596V7.69562H130.619ZM164 7.69562L154.806 19.7516L164 31.801H158.815L152.214 23.1601L145.619 31.801H140.434L149.628 19.7516L140.434 7.69562H145.619L152.214 16.3432L158.815 7.69562H164Z" fill="#C05037"></path></svg>
                    </div>
                    <div className="px-4">
                        <Button variant="default" className="w-full sticky bg-[#313035] hover:bg-[#3d3c40]" onClick={() => { router.push("/"); dispatch(setCurrentChat("")) }}>
                            <PiPencilSimpleLineThin size={20} className="mr-2" />
                            Create new chat
                        </Button>
                    </div>
                    {chatHistory && <div className="mt-5 flex flex-col items-center text-muted max-h-[calc(85%-50px)] h-full overflow-auto scrollbar-custom gap-1">
                        <h1 className="w-full text-left text-xs text-muted mb-5 px-3">History</h1>
                        {
                            chatHistory.length > 0 ? chatHistory.map((item, index) => (
                                <div key={index} className={item?.chat_id === currentChat.id ? "w-full p-3 px-4 min-h-11 rounded-md cursor-pointer bg-[#313035] text-sm  overflow-hidden text-ellipsis whitespace-nowrap flex gap-1" : "w-full flex gap-1 p-3 rounded-md cursor-pointer min-h-11 hover:bg-[#313035] text-sm  overflow-hidden text-ellipsis whitespace-nowrap"} onClick={() => { router.push(`/chat/${item.chat_id}`); dispatch(changeSidebarState()); dispatch(setCurrentChat({ id: item.chat_id, label: item.label })) }}>
                                    <p key={index} className={item?.chat_id === currentChat.id ? "w-full cursor-pointer bg-[#313035] text-sm  overflow-hidden text-ellipsis whitespace-nowrap" : "w-full cursor-pointer hover:bg-[#313035] text-sm  overflow-hidden text-ellipsis whitespace-nowrap"} onClick={() => { router.push(`/chat/${item.chat_id}`); dispatch(setCurrentChat({ id: item.chat_id, label: item.label })) }}>
                                        {item.label}
                                    </p>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-gray-700 hover:text-red-700"
                                        onClick={() => handleDeleteChat(item?.chat_id)}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </div>
                            )) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <RiLoader2Line size={20} className="animate-spin text-neutral-300" />
                                </div>

                            )
                        }
                    </div>}
                    <div className="h-[50px] w-full px-2 py-2">
                        <Button variant="default" className="w-full sticky bg-[#313035] hover:bg-[#3d3c40]" onClick={() => { redirectPage() }}>
                            <IoIosLogOut size={20} className="mr-2" />
                            Log Out
                        </Button>
                    </div>
                </div>
                <Button variant="outline" className="text-muted-foreground size-10 p-0" onClick={() => {
                    dispatch(changeSidebarState())
                }}>
                    <MdKeyboardArrowLeft size={30} />
                </Button>
            </div>
        </>
    )
}
