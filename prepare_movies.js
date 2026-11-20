const fs = require('fs');

const rawMovies = JSON.parse(fs.readFileSync('all_movies.json', 'utf-8'));

// Sample high-quality sample video streams / trailers for the player
const sampleVideos = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
];

const cleanedMovies = rawMovies.map((m, idx) => {
  const durationHours = m.duration ? Math.floor(m.duration / 60) : 1;
  const durationMins = m.duration ? (m.duration % 60) : 45;
  const durationStr = m.duration ? `${durationHours} soat ${durationMins} daqiqa` : '1 soat 50 daqiqa';
  
  // Format clean genres list
  const genreList = (m.genres || '')
    .split(',')
    .map(g => g.trim())
    .filter(g => g && g !== "O'zbekcha" && g !== "Filmlar" && g !== "O'zbek tiliga tarjima qilingan");

  // Descriptions in Uzbek
  const description = `${m.name} filmi ${m.year}-yilda ${m.countries || "O'zbekiston"}da suratga olingan. Ushbu film ${genreList.join(', ')} janrida bo'lib, tomoshabinlarga unutilmas taassurotlar ulashadi. Film o'zbek tilida professional dublyaj qilingan bo'lib, yuqori sifatli Full HD formatda taqdim etiladi.`;

  return {
    id: m.id,
    name: m.name,
    original_name: m.name,
    poster: m.thumbnail_big || m.thumbnail_small,
    poster_small: m.thumbnail_small || m.thumbnail_big,
    backdrop: m.thumbnail_big || m.thumbnail_small,
    year: m.year || 2022,
    rating: m.rating ? `${m.rating}+` : '12+',
    duration: m.duration || 110,
    duration_str: durationStr,
    countries: m.countries || "O'zbekiston",
    genres: m.genres || "Komediya, Drama",
    genre_list: genreList.length > 0 ? genreList : ['Drama', 'Komediya'],
    kinopoisk_rating: m.kinopoisk_rating ? Number(m.kinopoisk_rating).toFixed(1) : (6.5 + (idx % 25) * 0.1).toFixed(1),
    imdb_rating: m.imdb_rating ? Number(m.imdb_rating).toFixed(1) : (6.3 + (idx % 23) * 0.1).toFixed(1),
    quality: idx % 3 === 0 ? '4K Ultra HD' : 'Full HD',
    description: description,
    video_url: sampleVideos[idx % sampleVideos.length],
    audio_tracks: ["O'zbekcha (Professional)", "Original"],
    subtitles: ["O'zbekcha", "Ruscha"]
  };
});

fs.writeFileSync('movies.json', JSON.stringify(cleanedMovies, null, 2));
console.log(`Successfully generated movies.json with ${cleanedMovies.length} movies!`);
