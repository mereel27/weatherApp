import { useEffect, useState, memo } from 'react';
import { WiMoonAltFull } from 'react-icons/wi';

const MoonIcon = memo(({ name, size }) => {
  
  const [icon, setIcon] = useState(<WiMoonAltFull size={size} className='moonIcon'/>);
  useEffect(() => {
    /* console.log('moon render'); */
    (async () => {
      const Icon = (await import('react-icons/wi'))[name];
      if (Icon) {
        setIcon(<Icon size={size} className='moonIcon'/>)
      }
    })()
  }, [name, size]);

  return (
    <>
      {icon}
    </>
  )
});

export default MoonIcon;
