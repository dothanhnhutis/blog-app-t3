const InputAuth = ({
  type,
  name,
  setOnFocus,
  ...props
}: {
  id: string;
  name: "otp" | "email" | "password";
  value: string;
  className: string;
  type: "text" | "password" | "email";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setOnFocus?: React.Dispatch<
    React.SetStateAction<"otp" | "email" | "password" | undefined>
  >;
}) => {
  return (
    <input
      autoCapitalize="on"
      name={name}
      type={type}
      onFocus={() => setOnFocus && setOnFocus(name)}
      onBlur={() => setOnFocus && setOnFocus(undefined)}
      {...props}
    />
  );
};

export default InputAuth;
