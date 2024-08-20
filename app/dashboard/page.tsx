'use client'

/* import { getSession } from "next-auth/react"*/
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
//import { useRouter } from "next/router"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"



const initialUser = {
    name: 'test',
    email: 'test@test.com',
    image: ''
}

/*código de servidor que no se puede usar en app/
export const getServerSideProps = async () => {
    const session = await getSession()

    return {
        props: {
            session: session
        }
    }
} */

export default function HomePage() {
    
    //LOGICA DE FRONTEND
    const [user, setUser] = useState(initialUser)

    /* useEffect(() => {
        console.log('use effect');

        (async () => {
            const session = await getSession()
            console.log('session', session);
            console.log('session user', session?.user);
            setUser(session?.user)
        })()
    }, []) */
   ////end logic frontend


   /* useSession */
   /* NECESITA UN CONTEXTO, UN PROVIDER */
   //const router = useRouter()
    const [ loading, setLoading ] = useState(true)
    const { data: session, status } = useSession()
    console.log('data', session?.user ?? initialUser);
    console.log('status', status);
    
    if (status === 'loading') {
        return <p>Loading...</p>
    }
    
    if (status === 'unauthenticated') {
        redirect('/')
    }

   /* useSession */

    return (
        <main className="m-10 rounded-[20px] border border-white p-8 ">
            {/* {loading ? <p>Loading...</p> : */}
                <>
                <h1 className="text-2xl font-bold mb-8">Hola home</h1>
                <div className="container">
                    <div className="row">
                        {/* <p>Hola individuo:  {user.name}</p>
                        <br />
                        <p>{JSON.stringify(user, null, 2)}</p> */}
                        <p>Hola individuo:  {session?.user?.name}</p>
                        <br />
                        <p>{session?.user?.email}</p>
                        <div>
                            <Image
                                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] rounded border border-white m-6"
                                src={session?.user?.image ?? ''}
                                width={180}
                                height={37}
                                alt={"imagen"}
                            />
                        </div>
                    </div>
                    <div className="row flex justify-center">
                        <Link
                            href={"/api/auth/signout"}
                            className="text-white border border-white p-6 rounded-lg"
                        >
                            Cerrar Session
                        </Link>
                    </div>
                </div>
                </>
            {/* } */}
        </main>
    )

}
