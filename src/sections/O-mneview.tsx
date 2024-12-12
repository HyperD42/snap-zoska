import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';

export default function AboutMeView() {
    return (
    <Container>
        <Typography variant='h4'>O Mne</Typography><Typography>
            <Link href="https://zochova.sk/">Moja Škola</Link></Typography>
    </Container>
    )
}