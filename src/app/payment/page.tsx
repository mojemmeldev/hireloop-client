import { PaymentView } from "@/components/payment/payment-view";

const PaymentPage =async ({searchParams}:{searchParams:Promise<{canceled?:string}>}) => {
     const { canceled } = await searchParams

  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and check out when you\'re ready.'
    )
  }


    return <PaymentView />;
};

export default PaymentPage;
