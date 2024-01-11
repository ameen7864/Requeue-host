import { useRouter } from "next/router" 
import { useEffect } from "react";
import MainParentLayout from "../components/host/MainParentLayout";
 
export default function Home() { 
  const router = useRouter();
  const pathname = router.pathname

  useEffect(() => {
    if(pathname == '/' ){
        router.push('home')
    }
  });
return(
  <MainParentLayout fullpage={ 
      <>
      <h1>Loading</h1>
      </>
  }/>
)
}



