export const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF', 'SGD', 'AED']

export const timeZones = [
  '(GMT-12:00) International Date Line West',
  '(GMT-11:00) Midway Island, Samoa',
  '(GMT-10:00) Hawaii',
  '(GMT-09:00) Alaska',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-07:00) Mountain Time (US & Canada)',
  '(GMT-06:00) Central Time (US & Canada)',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT+00:00) London, Dublin, Lisbon',
  '(GMT+01:00) Berlin, Paris, Rome',
  '(GMT+05:30) Chennai, Kolkata, Mumbai',
  '(GMT+08:00) Singapore, Beijing, Perth',
  '(GMT+09:00) Tokyo, Seoul',
  '(GMT+10:00) Sydney, Melbourne',
]

export interface NotificationOption { id: string; label: string; on: boolean }
export const notificationOptions: NotificationOption[] = [
  { id: 'currency', label: 'I send or receive digita currency', on: true },
  { id: 'merchant', label: 'I receive merchant order', on: false },
  { id: 'recommend', label: 'There are recommendation for my account', on: true },
]
