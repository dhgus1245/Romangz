// App.js
import {useState} from 'react';
import { AppBar, Toolbar, Typography, Button, Container, TextField, Box, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
// ajax
import axios from 'axios';

const popularPhones = [
    { id: 1, name: "iPhone 14 Pro", price: "900,000원", img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-model-select-202209-6-1inch?wid=470&hei=556&fmt=png-alpha&.v=1660753619946" },
    { id: 2, name: "Samsung Galaxy S23", price: "850,000원", img: "https://images.samsung.com/is/image/samsung/p6pim/levant/sm-s911ezwdmea/gallery/levant-galaxy-s23-s911-433362-sm-s911ezwdmea-530591033?$1300_1038_PNG$" },
    { id: 3, name: "LG Velvet", price: "350,000원", img: "https://www.lg.com/us/images/cell-phones/md07501451/gallery/desktop-01.jpg" },
];

export default function Phonedemonium() {

    const [search, setSearch] = useState("");
    const [searchPhone, setSearchPhone] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 제출 막기
        alert(search); // 검색어 확인

        try {
            const res = await axios.get(`http://localhost:8080/phone/search?keyword=${encodeURIComponent(search)}`);
            console.log("검색 결과:", res.data);
            setSearchPhone(searchPhone); // 서버에서 검색된 휴대폰 리스트를 상태에 저장
        } catch (err) {
            console.error('검색 중 오류:', err);
        }
    };

    return (
        <div>
            {/* 헤더 */}
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        중고폰마켓
                    </Typography>
                    <Button color="inherit">로그인</Button>
                    <Button color="inherit">회원가입</Button>
                </Toolbar>
            </AppBar>

            {/* 메인 컨테이너 */}
            <Container sx={{mt: 4}}>
                {/* 검색창 */}
                <form onSubmit={handleSubmit}>
                    <Box sx={{mb: 5, textAlign: "center"}}>
                        <TextField
                            label="모델명, 제조사 검색"
                            variant="outlined"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{width: "60%", maxWidth: 600}}
                        />
                    </Box>

                    {/* 인기 휴대폰 추천 */}
                    <Typography variant="h5" sx={{mb: 3, fontWeight: "bold"}}>
                        인기 휴대폰 추천
                    </Typography>

                    <Grid container spacing={3}>
                        {popularPhones.map(phone => (
                            <Grid item xs={12} sm={6} md={4} key={phone.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={phone.img}
                                        alt={phone.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{phone.name}</Typography>
                                        <Typography color="text.secondary">{phone.price}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">자세히 보기</Button>
                                        <Button size="small" color="primary">구매하기</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* 안전 거래 안내 */}
                    <Box sx={{mt: 8, p: 3, bgcolor: '#e3f2fd', borderRadius: 2}}>
                        <Typography variant="h6" gutterBottom>
                            안전 거래 & 구매 가이드
                        </Typography>
                        <Typography>
                            중고거래 시 사기 예방을 위해 판매자 정보를 꼭 확인하고, 안전 결제 시스템을 이용하세요.
                        </Typography>
                    </Box>
                </form>
            </Container>

            {/* 푸터 */}
            <Box component="footer" sx={{ mt: 10, py: 3, bgcolor: '#1976d2', color: 'white', textAlign: 'center' }}>
                <Typography>© 2025 중고폰마켓. All rights reserved.</Typography>
            </Box>
        </div>
    );
}

