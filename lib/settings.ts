export const SETTING_KEYS = ["location", "phoneDisplay", "phoneHref", "email"] as const;
export type SettingKey = (typeof SETTING_KEYS)[number];

export const SETTING_LABELS: Record<SettingKey, string> = {
  location: "الموقع",
  phoneDisplay: "رقم الهاتف (كما يظهر)",
  phoneHref: "رقم الاتصال (بصيغة دولية، مثل +218915671934)",
  email: "البريد الإلكتروني",
};
