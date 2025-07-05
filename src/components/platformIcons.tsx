import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaYoutube, FaGlobe } from 'react-icons/fa';

export const PLATFORM_ICONS = [
  { name: 'github', label: 'GitHub', icon: FaGithub },
  { name: 'linkedin', label: 'LinkedIn', icon: FaLinkedin },
  { name: 'twitter', label: 'Twitter', icon: FaTwitter },
  { name: 'instagram', label: 'Instagram', icon: FaInstagram },
  { name: 'facebook', label: 'Facebook', icon: FaFacebook },
  { name: 'youtube', label: 'YouTube', icon: FaYoutube },
  { name: 'website', label: 'Website', icon: FaGlobe },
];

export type PlatformIconName = typeof PLATFORM_ICONS[number]['name'];
