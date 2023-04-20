import { db } from "@/lib/firebase";
import { adminSDK } from "@/lib/firebaseAdmin";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import nookies from "nookies";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  if (!cookies.token) {
    console.log("n tem cookie");

    return {
      redirect: {
        destination: "/sign-up",
        permanent: false,
      },
    };
  }

  try {
    const token = await adminSDK.auth().verifyIdToken(cookies.token);
    if (!token) {
      console.log("n tem user");

      return {
        redirect: {
          destination: "/sign-up",
          permanent: false,
        },
      };
    }

    const userRef = doc(db, "users", token.uid);
    const userSnap = await getDoc(userRef);

    return {
      props: {
        user: userSnap.data(),
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/sign-up",
        permanent: false,
      },
    };
  }
};

export default function Generate() {
  return <h1 className="text-3xl font-bold underline">Generate</h1>;
}
