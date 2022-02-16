import { useEffect, useState, memo } from 'react';

export const MoonIcon = memo(({ name, size }) => {
  /* console.log(name) */
  const [icon, setIcon] = useState(null);
  useEffect(() => {
    /* console.log('moon render'); */
    (async () => {
      const Icon = (await import('react-icons/wi'))[name];
      setIcon(<Icon size={size} className='moonIcon'/>)
    })()
  }, [name, size]);

  return (
    <>
      {icon}
    </>
  )
});

export default MoonIcon;
