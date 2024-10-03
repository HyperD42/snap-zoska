
//src/app/prispevok/[prispevokId]/page.tsx

import Typography from '@mui/material/Typography';

export const metadata = { title: 'Detail Prispevku | ZoškaSnap' };

export default function PostDetail( {params,}: {params: {prispevokId: string} }) {

  return (
  
      <Typography>Detail Prispevku {params.prispevokId}</Typography>

  );
}
