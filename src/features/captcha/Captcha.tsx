import s from "./сaptcha.module.css";

type CaptchaProps = {
  captchaUrl: string | null;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onRefresh?: () => void;
};

export const Captcha = ({ captchaUrl, value, onChange, error, onRefresh }: CaptchaProps) => {
  return (
    <div className={s.captchaContainer}>
      {captchaUrl && (
        <div>
          <img src={captchaUrl} alt="captcha" className={s.captchaImage} />
          {onRefresh && <button onClick={onRefresh} className={s.refreshButton}>Refresh Captcha</button>}
        </div>
      )}
      <input
        type="text"
        placeholder="Enter captcha"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        className={s.captchaInput}
      />
      {error && <p className={s.errorMessage}>{error}</p>}
    </div>
  );
};