import { useEffect, useState, memo } from 'react';
import { getMoonInfo } from '../../utils/utils';

export const MoonIcon = memo(({ phase, size }) => {
  const [icon, setIcon] = useState(null);
  useEffect(() => {
    /* console.log('moon render'); */
    const iconName = getMoonInfo(phase).iconName;
    (async () => {
      const Icon = (await import('react-icons/wi'))[iconName];
      setIcon(<Icon size={size} className='moonIcon'/>)
    })()
  }, [phase, size]);

  return (
    <>
      {icon}
      <span>{getMoonInfo(phase).phaseName}</span>
    </>
  )
});

export default MoonIcon;
