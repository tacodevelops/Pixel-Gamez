import React from 'react';

export type IconName =
  | 'home' | 'trending' | 'new' | 'rocket' | 'eye' | 'star' | 'fire' | 'heart'
  | 'action' | 'adventure' | 'arcade' | 'board' | 'card' | 'clicker' | 'driving'
  | 'io' | 'puzzle' | 'shooting' | 'simulation' | 'sports' | 'strategy'
  | 'code' | 'community';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, ...props }: IconProps) {
  const commonProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props
  };

  switch (name) {
    case 'home':
      return <svg {...commonProps}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
    case 'trending':
      return <svg {...commonProps}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>;
    case 'new':
      return <svg {...commonProps}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
    case 'rocket':
      return <svg {...commonProps}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
    case 'eye':
      return <svg {...commonProps}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
    case 'star':
      return <svg {...commonProps}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
    case 'fire':
      return <svg {...commonProps}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>;
    case 'heart':
      return <svg {...commonProps}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;

        case 'action':
      return <svg {...commonProps}><path d="M14.5 17.5L3 6" /><path d="M3 13l4.5 4.5" /><path d="M13 3l4.5 4.5" /><path d="M21 3L9.5 14.5" /></svg>;
    case 'adventure':
      return <svg {...commonProps}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>;
    case 'arcade':
      return <svg {...commonProps}><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M8 10h8" /><path d="M12 14v4" /><circle cx="12" cy="18" r="1" /></svg>;
    case 'board':
      return <svg {...commonProps}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /></svg>;
    case 'card':
      return <svg {...commonProps}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="10" y1="12" x2="14" y2="12"/></svg>;
    case 'clicker':
      return <svg {...commonProps}><path d="M11 2v4"/><path d="M11 22v-4"/><path d="M2 11h4"/><path d="M22 11h-4"/><path d="m5 5 2.8 2.8"/><path d="m19 19-2.8-2.8"/><path d="m5 19 2.8-2.8"/><path d="m19 5-2.8 2.8"/></svg>;
    case 'driving':
      return <svg {...commonProps}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>;
    case 'io':
      return <svg {...commonProps}><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>;
    case 'puzzle':
      return <svg {...commonProps}><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 0-.288.877l.131.86a3.61 3.61 0 0 1-3.592 4.148H15.4c-.322.049-.648-.059-.878-.289l-1.568-1.568a2.41 2.41 0 0 0-3.408 0l-1.611 1.611c-.23.23-.556.338-.877.288l-.86-.131a3.61 3.61 0 0 1-4.148-3.592v-.536c-.049-.322.059-.648-.289-.878l1.568-1.568a2.41 2.41 0 0 0 0-3.408l-1.611-1.611a.98.98 0 0 0-.877-.288l-.86.131a3.61 3.61 0 0 1-3.592-4.148V8.6c.049-.322-.059-.648-.289-.878l-1.568-1.568A2.41 2.41 0 0 1 2 2.746s.235-1.233.706-1.704l1.611-1.611a.98.98 0 0 1 .877.288l.86.131A3.61 3.61 0 0 1 10.202 3.44v.536c.049.322-.059.648-.289.878L8.345 6.422a2.41 2.41 0 0 0 0 3.408l1.611 1.611c.23.23.556.338.877.288l.86-.131a3.61 3.61 0 0 1 4.148 3.592v.536z" /></svg>;
    case 'shooting':
      return <svg {...commonProps}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /><line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /></svg>;
    case 'simulation':
      return <svg {...commonProps}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>;
    case 'sports':
      return <svg {...commonProps}><circle cx="12" cy="12" r="10" /><path d="M5.5 5.5A10.5 10.5 0 0 1 12 2A10.5 10.5 0 0 1 18.5 5.5M18.5 18.5A10.5 10.5 0 0 1 12 22A10.5 10.5 0 0 1 5.5 18.5" /><path d="M2 12h20" /></svg>;
    case 'strategy':
      return <svg {...commonProps}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /><circle cx="12" cy="12" r="1" fill="currentColor" /></svg>;
    case 'code':
      return <svg {...commonProps}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" /></svg>;
    case 'community':
      return <svg {...commonProps}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    default:
      return <svg {...commonProps}><circle cx="12" cy="12" r="10" /></svg>;
  }
}
