const fs = require('fs');
const dataPath = 'c:\\Users\\dahir\\Documents\\pixelgamez\\components\\UserProfile.tsx';
let content = fs.readFileSync(dataPath, 'utf8');

const s1 = `  const [friendStatus, setFriendStatus] = useState<string>('none');`;
const e1 = `  }, [isOwnProfile, user]);\n`;
if (content.indexOf(s1) !== -1) {
  content = content.substring(0, content.indexOf(s1)) + content.substring(content.indexOf(e1) + e1.length);
}

const s2 = `  const handleFriendAction = async (action: 'follow' | 'unfollow') => {`;
const e2 = `  };\n`;
if (content.indexOf(s2) !== -1) {
  content = content.substring(0, content.indexOf(s2)) + content.substring(content.indexOf(e2, content.indexOf(s2)) + e2.length);
}

const s3 = `<div className="profile-avatar-wrapper" onClick={() => isOwnProfile && avatarInputRef.current?.click()}>`;
const e3 = `          <div className="profile-banner__info">`;
if (content.indexOf(s3) !== -1) {
  content = content.substring(0, content.indexOf(s3)) + 
`<div className="profile-avatar-wrapper" style={{ cursor: 'default' }}>
            <div className="profile-avatar__placeholder" style={{ background: 'var(--accent-primary)', fontSize: '4rem' }}>
              {displayUser.displayName.charAt(0).toUpperCase()}
            </div>
          </div>
` + content.substring(content.indexOf(e3));
}

const s4 = `<span className="profile-banner__meta-item" style={{ marginLeft: '12px' }}>`;
const e4 = `          </div>\n        </div>`;
if (content.indexOf(s4) !== -1) {
  content = content.substring(0, content.indexOf(s4)) + content.substring(content.indexOf(e4, content.indexOf(s4)));
}

const s5 = `<div className="profile-col profile-col--right">`;
const e5 = `</div>\n      </div>\n\n      <div style={{ marginTop: 'var(--space-6)' }}>`;
if (content.indexOf(s5) !== -1) {
  content = content.substring(0, content.indexOf(s5)) + content.substring(content.indexOf(e5, content.indexOf(s5)));
}

content = content.replace(`const avatarInputRef = useRef<HTMLInputElement>(null);\n`, '');
content = content.replace(`const [activeTab, setActiveTab] = useState<'submissions' | 'favorites' | 'friends' | 'recent'>('submissions');\n`, '');
content = content.replace(`const { user, updateBio, updateDisplayName, uploadAvatar, openAuthModal } = useAuth();`, `const { user, updateBio, updateDisplayName, openAuthModal } = useAuth();`);

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Cleaned user profile');
