import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCardStore } from "./store/CardStore";

const schema = z.object({
  CardholderName: z.string()
    .min(1, "CardholderName is required")
    .regex(/^[a-zA-Z\s]+$/, "Wrong format, text only"),
  CardNumber: z.string()
    .min(19, "Card number must be 16 digits with spaces")
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Wrong card format, numbers only"),
  MM: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      if (typeof val === "string") return Number(val);
      return val;
    },
    z.number({ invalid_type_error: "Can't be blank" })
      .min(1, "Invalid month")
      .max(12, "Invalid month")
  ),
  YY: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      if (typeof val === "string") return Number(val);
      return val;
    },
    z.number({ invalid_type_error: "Can't be blank" })
      .min(7, "Invalid year")
      .max(99, "Invalid year")
  ),
  CVC: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      if (typeof val === "string") return Number(val);
      return val;
    },
    z.number({ invalid_type_error: "Can't be blank" })
      .min(100, "Invalid CVC")
      .max(999, "Invalid CVC")
  ),
});
const reload=()=>{
  window.location.reload();

}

type FormFields = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { setSubmitted, setCardInfo, isSubmitted, cardInfo } = useCardStore();

  const handleZustandSubmit: SubmitHandler<FormFields> = (data) => {
    setCardInfo(data);
    setSubmitted(true);
  
  };

  const cardName = watch("CardholderName") || "Jane Appleseed";
  const cardNumber = watch("CardNumber") || "0000 0000 0000 0000";
  const mmValue = watch("MM");
  const yyValue = watch("YY");

  const mm = typeof mmValue === "number" && !isNaN(mmValue) ? mmValue.toString().padStart(2, "0") : "00";
  const yy = typeof yyValue === "number" && !isNaN(yyValue) ? yyValue.toString().padStart(2, "0") : "00";
cardInfo
  if (isSubmitted) {
    console.log()
    return (
   
  
    <div className="w-full h-screen flex bg-white">
      
      <div className="flex items-center justify-center flex-col w-4/12 h-full bg-bg-main-desktop bg-no-repeat bg-cover bg-center">
        <div className="w-full h-[800px] relative left-24 flex items-end justify-center flex-col gap-10">
          <div className="bg-bg-card-front bg-no-repeat bg-cover bg-center w-[447px] h-[245px] shadow-2xl rounded-lg p-5">
            <div className="bg-bg-card-logo bg-no-repeat w-24 h-16 flex items-center justify-center" />
            <h1 className="mt-16 text-2xl text-white tracking-widest">0000 0000 0000 0000</h1>
            <div className="flex items-center justify-between mt-4 text-white uppercase tracking-wide text-sm">
              <h2>JANE APPLESEED</h2>
              <h2>00/00</h2>
            </div>
          </div>
          <div className="relative left-24 bg-bg-card-back bg-no-repeat bg-cover bg-center w-[447px] h-[245px] shadow-2xl rounded-lg"></div>
        </div>
      </div>

     
      <div className="w-8/12 flex items-center justify-center flex-col">
        <div className="bg-bg-complete-icon bg-no-repeat w-20 h-20 mb-10"></div>
        <h1 className="text-neutral-purple950 text-2xl font-semibold mb-2">THANK YOU!</h1>
        <p className="text-neutral-gray400">We've added your card details</p>
            <button  
           onClick={reload}
            className="mt-8 bg-neutral-purple950 text-white px-28 py-4 rounded-xl ">
            Confirm
          </button>
      </div>
    </div>)
  }
  return (
    <div className="w-full h-screen flex bg-white">
      
      <div className="flex items-center justify-center flex-col w-4/12 h-full bg-bg-main-desktop bg-no-repeat bg-cover bg-center">
        <div className="w-full h-[800px] relative left-24 flex items-end justify-center flex-col gap-10">
          <div className="bg-bg-card-front bg-no-repeat bg-cover bg-center w-[447px] h-[245px] shadow-2xl rounded-lg p-5">
            <div className="bg-bg-card-logo bg-no-repeat w-24 h-16 flex items-center justify-center" />
            <h1 className="mt-16 text-2xl text-white tracking-widest">{cardNumber}</h1>
            <div className="flex items-center justify-between mt-4 text-white uppercase tracking-wide text-sm">
              <h2>{cardName}</h2>
              <h2>{`${mm}/${yy}`}</h2>
            </div>
          </div>
          <div className="relative left-24 bg-bg-card-back bg-no-repeat bg-cover bg-center w-[447px] h-[245px] shadow-2xl rounded-lg"></div>
        </div>
      </div>

     
      <div className="w-8/12 flex items-center justify-center">
        <form className="w-8/12 max-w-[445px]" onSubmit={handleSubmit(handleZustandSubmit)}>

          <div>
            <label htmlFor="CardholderName" className="block text-sm font-medium text-neutral-purple950 ">CARDHOLDER NAME</label>
            <input
              type="text"
              {...register("CardholderName")}
              className={`w-full h-14 rounded-xl mt-3 border cursor-pointer ${errors.CardholderName ? "border-red-500" : "border-gray-300"} pl-5 focus:outline-none focus:border-purple-600`}
            />
            {errors.CardholderName && (
              <div className="text-red-500 text-sm mt-1">{errors.CardholderName.message}</div>
            )}
          </div>

        
          <div className="mt-5">
            <label htmlFor="CardNumber" className="block text-sm font-medium text-neutral-purple950 ">CARD NUMBER</label>
            <input
              type="text"
              {...register("CardNumber")}
              className={`w-full h-14 rounded-xl mt-3 border cursor-pointer  ${errors.CardNumber ? "border-red-500" : "border-gray-300"} pl-5 focus:outline-none focus:border-purple-600`}
            />
            {errors.CardNumber && (
              <div className="text-red-500 text-sm mt-1">{errors.CardNumber.message}</div>
            )}
          </div>

        
          <div className="flex gap-4 mt-5">
            <div className="w-6/12">
              <label htmlFor="MM" className="block text-sm font-medium text-neutral-purple950 ">EXP. DATE (MM/YY)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  {...register("MM", { valueAsNumber: true })}
                  className={`appearance-none w-full h-14 rounded-xl mt-3 border cursor-pointer ${errors.MM ? "border-red-500" : "border-gray-300"} pl-5 focus:outline-none focus:border-purple-600`}
                />
                <input
                  type="number"
                  {...register("YY", { valueAsNumber: true })}
                  className={`appearance-none w-full h-14 rounded-xl mt-3 border cursor-pointer ${errors.YY ? "border-red-500" : "border-gray-300"} pl-5 focus:outline-none focus:border-purple-600`}
                />
              </div>
              {(errors.MM || errors.YY) && (
                <div className="text-red-500 text-sm mt-1">{errors.MM?.message || errors.YY?.message}</div>
              )}
            </div>

            <div className="w-6/12">
              <label htmlFor="CVC" className="block text-sm font-medium text-neutral-purple950 ">CVC</label>
              <input
                type="number"
                {...register("CVC", { valueAsNumber: true })}
                className={`appearance-none w-full h-14 rounded-xl mt-3 border cursor-pointer ${errors.CVC ? "border-red-500" : "border-gray-300"} pl-5 focus:outline-none focus:border-purple-600`}
              />
              {errors.CVC && <div className="text-red-500 text-sm mt-1">{errors.CVC.message}</div>}
            </div>
          </div>

          <button type="submit" className="mt-8 bg-neutral-purple950 text-white w-full py-4 rounded-xl ">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
