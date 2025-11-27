import s from "./сaptcha.module.css";
import { UseFormRegister } from "react-hook-form";
import { LoginInputs } from "@/features/auth/lib/schemas";
import { Button } from "@mui/material";

type CaptchaProps = {
  captchaUrl: string | null;
  register: UseFormRegister<LoginInputs>;
  error?: string;
  onRefresh?: () => void;
};

export const Captcha = ({ captchaUrl, register, error, onRefresh }: CaptchaProps) => {
  return (
    <div className={s.captchaContainer}>
      <p>Please enter the text from the image below to prove you are not a robot.</p>
      {captchaUrl && (
        <div>
          <img src={captchaUrl} alt="captcha" className={s.captchaImage} />
          <br />
          {onRefresh && <Button onClick={onRefresh} variant="outlined" className={s.refreshButton}>Refresh Captcha</Button>}
        </div>
      )}
      <input
        type="text"
        placeholder="Enter captcha"
        {...register("captcha")}
        className={s.captchaInput}
      />
      {error && <p className={s.errorMessage}>{error}</p>}
    </div>
  );
};