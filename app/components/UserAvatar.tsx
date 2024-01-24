import { signIn, signOut, useSession } from "next-auth/react"

export const UserAvatar = () => {
    const session = useSession()

    function onClickSignIn() {
        signIn("github")
          .catch(error => console.log("Sign In error: ", error))
    }

    function onClickSignOut() {
        signOut()
          .catch(error => console.log("Sign Out error: ", error))
    }

    if(session.status === "authenticated" && session.data.user) {
        return (
            <div className="flex flex-col p-10 gap-8 items-center">
                <img src={session.data.user?.image || ""} alt={session.data.user?.name || "avatar"} className="w-32 h-32 rounded-full ring-4 ring-blue-500/60" />
                <div className="flex flex-col gap-1 items-center">
                    <div className="text-2xl font-semibold">{session.data.user?.name}</div>
                    <div className="font-normal text-sm text-neutral-500">{session.data.user?.email}</div>
                    {session.data.user.id && <span className="mt-2 px-3 py-[1px] uppercase text-xs bg-blue-500/30 text-neutral-300 rounded-full ring-1 ring-blue-500">{session.data.user.is_admin ? "Admin" : "User"}</span>}
                    {!session.data.user.id && <span className="mt-2 px-3 py-[1px] uppercase text-xs bg-red-500/30 text-neutral-300 rounded-full ring-1 ring-red-500">{"Unauthorized"}</span>}
                </div>
                <button onClick={onClickSignOut} className="duration-200 px-5 py-3 rounded-xl ring-2 ring-neutral-500 hover:ring-4 active:bg-blue-500/10 active:scale-95">Sign Out</button>
                <pre className="text-xs p-3 rounded-lg bg-white/30">{JSON.stringify(session.data, null, 4)}</pre>
            </div>
        )
    } else if(session.status === "unauthenticated") {
        return (
            <button onClick={onClickSignIn} className="duration-200 px-5 py-3 rounded-xl ring-2 hover:ring-4 active:bg-blue-500/10 active:scale-95">Sign In</button>
        )
    }
    return (
        <div className="text-neutral-400 flex gap-2 items-center">
            Loading...
            <div className="w-4 h-16 flex items-center"><div className="w-full h-[2px] bg-neutral-400 animate-spin" /></div>
        </div>
    )
}