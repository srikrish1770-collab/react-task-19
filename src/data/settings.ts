export const settingsTabs = ['Edit Profile', 'Preferences', 'Security']
export interface ProfileField { id: string; label: string; value: string; type?: string; chevron?: boolean }
export const profileFields: ProfileField[] = [
  { id: 'name', label: 'Your Name', value: 'Charlene Reed' },
  { id: 'username', label: 'User Name', value: 'Charlene Reed' },
  { id: 'email', label: 'Email', value: 'charlenereed@gmail.com', type: 'email' },
  { id: 'password', label: 'Password', value: '**********', type: 'password' },
  { id: 'dob', label: 'Date of Birth', value: '25 January 1990', chevron: true },
  { id: 'present', label: 'Present Address', value: 'San Jose, California, USA' },
  { id: 'permanent', label: 'Permanent Address', value: 'San Jose, California, USA' },
  { id: 'city', label: 'City', value: 'San Jose' },
  { id: 'postal', label: 'Postal Code', value: '45962' },
  { id: 'country', label: 'Country', value: 'USA' },
]
