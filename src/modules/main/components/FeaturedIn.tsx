import { Box, Stack, Typography } from '@mui/material';

const FeaturedIn = () => {
  const featuredImages = [
    'cbs.png',
    'aljazeera.png',
    'yahoo-news.png',
    'abc-news.png',
    'tbj.png',
    'tsb.png',
  ];

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={2}
      my={10}
    >
      <Typography variant="h5" color="#AF0E04">
        FEATURED IN
      </Typography>
      <Stack direction={{ sm: 'column', md: 'row' }} gap={2}>
        {featuredImages.map((item) => (
          <Box
            component="img"
            sx={{
              maxWidth: '150px',
              maxHeight: '150px',
              objectFit: 'contain',
            }}
            src={`/assets/images/home/featured/${item}`}
            alt={`Image ${item}`}
            key={item}
          />
        ))}
      </Stack>
    </Stack>
  );
};
