import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { tagsState, endpointData } from './services/atoms'
import { EndpointDataTyp, TagsStateType, sortByEnum, sortOrderEnum } from './services/enums';
import { ArrowDownward, ArrowUpward, FirstPage, LastPage } from '@mui/icons-material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useState } from 'react';


export function ControlPanelComponent() {
    const [tagsData] = useRecoilState<TagsStateType>(tagsState);
    const [endpoint, setEndpoint] = useRecoilState<EndpointDataTyp>(endpointData);
    const [pageSizeError, setPageSizeError] = useState<string | null>(null);
    const [pageNumberError, setPageNumberError] = useState<string | null>(null);

    const errorOrLoading = tagsData.loading || tagsData.error != null;
    let timeoutId: ReturnType<typeof setTimeout>;

    const buttonRoundedStyle = {
        borderRadius: '30px',
        flex: 'inline-flex',
        padding: '5',
        minWidth: '30px'
    };

    const smallButton = {
        height: '20px',
        minWidth: '20px'
    };

    const boxShadowStyle = {
        boxShadow: '2px 2px 6px 0px rgba(0, 0, 0, 0.4)',
        textShadow: '2px 2px 6px rgba(66, 68, 90, 0.4)'
    }

    const toggleSortOrder = () => {
        const newOrder = endpoint.order === sortOrderEnum.desc ? sortOrderEnum.asc : sortOrderEnum.desc;
        setEndpoint({ ...endpoint, order: newOrder });
    };

    const toggleSortBy = () => {
        const newSortBy = endpoint.sortBy === sortByEnum.popular ? sortByEnum.name : sortByEnum.popular;
        setEndpoint({ ...endpoint, sortBy: newSortBy });
    };

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeoutId);
        let value = parseInt(event.target.value);
        if (value < 1) {
            value = 1;
            event.target.value = value.toString();
        } else if (value > 100) {
            value = 100;
            setPageSizeError("Maksymalna wielkość strony to 100");
            event.target.value = value.toString();
        } else {
            setPageSizeError(null);
            event.target.value = value.toString();
            timeoutId = setTimeout(() => {
                setEndpoint({ ...endpoint, pagesize: value });
            }, 1000);
        }
    };

    const goToPage = (page: number) => {
        if (page - 1 > 0 || page + 1 < 25) {
            setEndpoint({ ...endpoint, page: page });
        } 
        if (page === 25) {
            setPageNumberError("25 to ostatnia strona")
        }
    };

    return (
        <div className='Top-container'>
            <div className='control-panel box-shadow'>
                <Box sx={{ padding: '20px' }}>
                    <h3 className='text-style'>Panel Kontrolny</h3>
                    <div className='control-panel-buttons'>
                        <FormControl variant="standard">
                            <div className='control-panel-buttons'>
                                <label className="control-label text-style ">Kolejność:</label>
                                <Button variant="contained"
                                    sx={boxShadowStyle}
                                    disabled={errorOrLoading}
                                    onClick={toggleSortOrder}>
                                    {endpoint.order === sortOrderEnum.desc ? "Malejąca " : "Rosnąca "}
                                    {endpoint.order === sortOrderEnum.desc ?
                                        <ArrowDownward sx={{ fontSize: 15 }} /> :
                                        <ArrowUpward sx={{ fontSize: 15 }} />}
                                </Button>
                            </div>
                            <div>
                                <label className="control-label text-style ">Sortowanie:</label>
                                <Button variant="contained"
                                    sx={boxShadowStyle}
                                    disabled={errorOrLoading}
                                    onClick={toggleSortBy}>
                                    {endpoint.sortBy === sortByEnum.name ? "Nazwą" : "Popularnością"}</Button>
                            </div>
                        </FormControl>
                    </div>
                </Box>
                <Box>
                    <div className='control-panel-buttons'>
                        <FormControl sx={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-evenly" }}>
                            <div className='control-panel-buttons'>
                                <label className="control-label text-style ">Wielkość strony:</label>
                                <TextField
                                    sx={{ maxWidth: '5rem' }}
                                    size="small"
                                    disabled={errorOrLoading}
                                    type="number"
                                    variant="outlined"
                                    defaultValue={endpoint.pagesize.toString()}
                                    onChange={handlePageSizeChange}
                                />
                            </div>
                        </FormControl>
                    </div>
                </Box>
                <Box>
                    <div className='control-panel-buttons'>
                        <FormControl sx={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-evenly" }}>
                            <div className='base-container'>
                                <label className="control-label" style={{ paddingRight: '0px' }}>Strona:</label>
                                <Button
                                    sx={buttonRoundedStyle}
                                    disabled={endpoint.page === 1 || errorOrLoading}
                                    onClick={() => goToPage(1)}>
                                    <FirstPage />
                                </Button>
                                <Button
                                    sx={buttonRoundedStyle}
                                    disabled={endpoint.page === 1 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page - 1)}>
                                    <ArrowBackIosNewIcon />
                                </Button>
                                {endpoint.page - 2 > 0 && (<Button
                                    sx={{ ...buttonRoundedStyle, ...smallButton }}
                                    disabled={endpoint.pagesize < 1 || endpoint.pagesize > 100 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page - 2)}>
                                    <p className='text-style'>{endpoint.page - 2}</p>
                                </Button>
                                )}
                                {endpoint.page - 1 > 0 && (<Button
                                    sx={{ ...buttonRoundedStyle, ...smallButton }}
                                    disabled={endpoint.pagesize < 1 || endpoint.pagesize > 100 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page - 1)}>
                                    <p className='text-style'>{endpoint.page - 1}</p>
                                </Button>
                                )}
                                <p className='text-style'>{endpoint.page}</p>
                                {endpoint.page + 1 <= 25 && (<Button
                                    sx={{ ...buttonRoundedStyle, ...smallButton }}
                                    disabled={endpoint.page === 25 || endpoint.pagesize < 1 || endpoint.pagesize > 100 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page + 1)}>
                                    <p className='text-style'>{endpoint.page + 1}</p>
                                </Button>
                                )}
                                {endpoint.page + 2 <= 25 && (<Button
                                    sx={{ ...buttonRoundedStyle, ...smallButton }}
                                    disabled={endpoint.page === 25 || endpoint.pagesize < 1 || endpoint.pagesize > 100 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page + 2)}>
                                    <p className='text-style'>{endpoint.page + 2}</p>
                                </Button>
                                )}
                                <Button
                                    sx={buttonRoundedStyle}
                                    disabled={endpoint.page === 25 || endpoint.pagesize < 1 || endpoint.pagesize > 100 || errorOrLoading}
                                    onClick={() => goToPage(endpoint.page + 1)}>
                                    <ArrowForwardIosIcon />
                                </Button>
                                <Button
                                    sx={buttonRoundedStyle}
                                    disabled={endpoint.page === 25 || endpoint.pagesize < 1 || endpoint.pagesize > 100 || errorOrLoading}
                                    onClick={() => goToPage(25)}>
                                    <LastPage />
                                </Button>
                            </div>
                        </FormControl>
                    </div>
                </Box>
                <div className='control-errors'>
                    {pageSizeError && (
                        <Typography variant="caption" color="error">
                            {pageSizeError}
                        </Typography>
                    )}
                    {pageNumberError && (
                        <Typography variant="caption" color="warning.main">
                            {pageNumberError}
                        </Typography>
                    )}
                </div>
            </div>
        </div>
    )
}