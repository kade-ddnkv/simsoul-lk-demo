import React, { useContext } from 'react';
import { Button, Grid, TextField, Tabs, Tab, Box, Typography, Divider, styled } from '@mui/material';
import { Radio, RadioGroup, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import { useMediaQuery, useTheme } from '@mui/material';
import { alpha } from "@mui/material";
import { useRouter } from 'next/router';
import Geography from '@/pages/tabs/GeographyTab';
import { HeaderText, StyledButton, StyledTextField, BoxInsideRadio } from '@/components/generalComponents';
import { MyContext } from '@/context/myContext';

function CoreSliceTab() {
  const { selectedCore, setSelectedCore } = useContext(MyContext)
  const { selectedTransferCore, setSelectedTransferCore } = useContext(MyContext)
  const { selectedTrafficWithOperator, setSelectedTrafficWithOperator } = useContext(MyContext)
  const { selectedFallbackWithOperator, setSelectedFallbackWithOperator } = useContext(MyContext)
  const { selectedTrafficWithLocal, setSelectedTrafficWithLocal } = useContext(MyContext)
  const { selectedFallbackWithLocal, setSelectedFallbackWithLocal } = useContext(MyContext)
  const { selectedFallbackWithTransfer, setSelectedFallbackWithTransfer } = useContext(MyContext)
  const { selectedDataCenterWithLocal, setSelectedDataCenterWithLocal } = useContext(MyContext)

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  const handleCoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCore((event.target as HTMLInputElement).value);
  };

  const handleTransferCoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTransferCore((event.target as HTMLInputElement).value);
  };

  const handleTrafficWithOperatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTrafficWithOperator((event.target as HTMLInputElement).value);
  };

  const handleFallbackWithOperatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFallbackWithOperator((event.target as HTMLInputElement).value);
  };

  const handleTrafficWithLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTrafficWithLocal((event.target as HTMLInputElement).value);
  };

  const handleFallbackWithLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFallbackWithLocal((event.target as HTMLInputElement).value);
  };

  const handleFallbackWithTransferChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFallbackWithTransfer((event.target as HTMLInputElement).value);
  };

  function isFallbackWithOperatorActive() {
    return selectedCore === 'operator' && selectedTrafficWithOperator === 'VPN'
  }

  function isFallbackWithLocalActive() {
    return selectedCore === 'local' && selectedTrafficWithLocal === 'VPN'
  }

  function isFallbackWithTransferActive() {
    return selectedCore === 'transfer'
  }

  return (
    <Box
      component="form"
      sx={{ width: '100%', }}
      noValidate
      autoComplete="off"
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <HeaderText>Core slice</HeaderText>
        </Grid>
        <Grid item xs={12}>
          <Typography>Select one of 4 options</Typography>
        </Grid>
        <Grid item xs={12} lg={2} />
        <Grid item xs={12} lg={7}>
          <RadioGroup
            name="which-core-radio-buttons-group"
            value={selectedCore}
            onChange={handleCoreChange}
          >
            <FormControlLabel value="operator" control={<Radio style={{ color: 'black' }} />} label={
              <Typography sx={{ fontWeight: 'bold' }}>Core slice on the MNO side and under MNO control.</Typography>
            } />
            <BoxInsideRadio>
              <Typography>Allocated virtualized mobile network resources (functions) on the mobile operator side. This option is fine if you I just need to control your traffic like routing it to your VPN.</Typography>
              <Box sx={selectedCore !== 'operator' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: 1 }}>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4} sx={{ mt: 1 }}>
                    <Typography>Route my data plane</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RadioGroup
                      name="fallback-operator-radio-buttons-group"
                      value={selectedTrafficWithOperator}
                      onChange={handleTrafficWithOperatorChange}
                    >
                      <FormControlLabel disabled={selectedCore !== 'operator'} value="public" control={
                        <Radio style={selectedCore === 'operator' ? { color: 'black' } : {}} />
                      } label={
                        <Typography>to public (Internet)</Typography>
                      } />
                      <FormControlLabel disabled={selectedCore !== 'operator'} value="VPN" control={
                        <Radio style={selectedCore === 'operator' ? { color: 'black' } : {}} />
                      } label={
                        <Typography>to VPN</Typography>
                      } />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={!isFallbackWithOperatorActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: 1 }}>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4} sx={{ mt: 1 }}>
                    <Typography>Fallback scenario,</Typography>
                    <Typography>if my VPN fails,</Typography>
                    <Typography>route data plane</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RadioGroup
                      name="fallback-operator-radio-buttons-group"
                      value={selectedFallbackWithOperator}
                      onChange={handleFallbackWithOperatorChange}
                    >
                      <FormControlLabel disabled={!isFallbackWithOperatorActive()} value="null" control={
                        <Radio style={isFallbackWithOperatorActive() ? { color: 'black' } : {}} />
                      } label={
                        <Typography>to null (do nothing, drop traffic to null)</Typography>
                      } />
                      <FormControlLabel disabled={!isFallbackWithOperatorActive()} value="public" control={
                        <Radio style={isFallbackWithOperatorActive() ? { color: 'black' } : {}} />
                      } label={
                        <Typography>to public (Internet)</Typography>
                      } />
                      <FormControlLabel disabled={!isFallbackWithOperatorActive()} value="VPN" control={
                        <Radio style={isFallbackWithOperatorActive() ? { color: 'black' } : {}} />
                      } label={
                        <Typography>to backup VPN</Typography>
                      } />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Box>
            </BoxInsideRadio>
            {/* <BoxInsideRadio>
              <Box sx={selectedCore !== 'operator' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Box>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2 }}>
                    <Grid item xs={12} lg={1} />
                    <Grid item xs={12} lg={3} sx={{ mt: 1 }}>
                      <Typography>Data plane goes</Typography>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      <RadioGroup
                        name="traffic-operator-radio-buttons-group"
                        value={selectedTrafficOperator}
                        onChange={handleTrafficOperatorChange}
                      >
                        <FormControlLabel disabled={selectedCore !== 'operator'} value="public" control={<Radio style={{ color: 'black' }} />} label={
                          <Typography sx={{ fontWeight: 'bold' }}>to public</Typography>
                        } />
                        <FormControlLabel disabled={selectedCore !== 'operator'} value="VPN" control={<Radio style={{ color: 'black' }} />} label={
                          <Typography sx={{ fontWeight: 'bold' }}>to VPN</Typography>
                        } />
                        <BoxInsideRadio sx={selectedTrafficOperator !== 'VPN' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                          <Box>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                              <Grid item xs={12} lg={1} />
                              <Grid item xs={12} lg={3}>
                                <Typography>Address</Typography>
                              </Grid>
                              <Grid item xs={12} lg={8}>
                                <StyledTextField disabled={selectedTrafficOperator !== 'VPN'}
                                  sx={{ width: '100%' }}
                                  size="small"
                                  label="Address"
                                  defaultValue="0.0.0.0:3000"
                                  variant="outlined"
                                />
                              </Grid>
                            </Grid>
                          </Box>
                          <Box>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                              <Grid item xs={12} lg={1} />
                              <Grid item xs={12} lg={3}>
                                <Typography>Credentials</Typography>
                              </Grid>
                              <Grid item xs={12} lg={8}>
                                <StyledTextField disabled={selectedTrafficOperator !== 'VPN'}
                                  sx={{ width: '100%' }}
                                  size="small"
                                  label="Username"
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={12} lg={1} />
                              <Grid item xs={12} lg={3} />
                              <Grid item xs={12} lg={8}>
                                <StyledTextField disabled={selectedTrafficOperator !== 'VPN'}
                                  sx={{ width: '100%' }}
                                  size="small"
                                  label="Password"
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={12} lg={1} />
                              <Grid item xs={12} lg={11} sx={{ mt: 3 }}>
                                <Typography sx={{ fontWeight: 'bold' }}>Fallback scenario</Typography>
                              </Grid>
                              <Grid item xs={12} lg={1} />
                              <Grid item xs={12} lg={3} />
                              <Grid item xs={12} lg={8} sx={{ mt: 3 }}>
                                <RadioGroup
                                  name="fallback-operator-radio-buttons-group"
                                  value={selectedFallbackOperator}
                                  onChange={handleFallbackOperatorChange}
                                >
                                  <FormControlLabel disabled={selectedTrafficOperator !== 'VPN'} value="public" control={<Radio style={{ color: 'black' }} />} label={
                                    <Typography sx={{ fontWeight: 'bold' }}>to public</Typography>
                                  } />
                                  <FormControlLabel disabled={selectedTrafficOperator !== 'VPN'} value="VPN" control={<Radio style={{ color: 'black' }} />} label={
                                    <Typography sx={{ fontWeight: 'bold' }}>to VPN</Typography>
                                  } />
                                  <BoxInsideRadio sx={selectedTrafficOperator !== 'VPN' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                                    <Box>
                                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                        <Grid item xs={12}>
                                          <Typography>Address</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <StyledTextField disabled={selectedTrafficOperator !== 'VPN'}
                                            sx={{ width: '100%' }}
                                            size="small"
                                            label="Address"
                                            defaultValue="0.0.0.0:3000"
                                            variant="outlined"
                                          />
                                        </Grid>
                                      </Grid>
                                    </Box>
                                    <Box>
                                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                                        <Grid item xs={12}>
                                          <Typography>Credentials</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <StyledTextField disabled={selectedTrafficOperator !== 'VPN'}
                                            sx={{ width: '100%' }}
                                            size="small"
                                            label="Username"
                                            variant="outlined"
                                          />
                                        </Grid>
                                        <Grid item xs={12}>
                                          <StyledTextField disabled={selectedTrafficOperator !== 'VPN'}
                                            sx={{ width: '100%' }}
                                            size="small"
                                            label="Password"
                                            variant="outlined"
                                          />
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  </BoxInsideRadio>
                                  <FormControlLabel disabled={selectedTrafficOperator !== 'VPN'} value="nothing" control={<Radio style={{ color: 'black' }} />} label={
                                    <Typography sx={{ fontWeight: 'bold' }}>do nothing</Typography>
                                  } />
                                </RadioGroup>
                              </Grid>
                            </Grid>
                          </Box>
                        </BoxInsideRadio>
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </BoxInsideRadio> */}
            <FormControlLabel value="local" control={<Radio style={{ color: 'black' }} />} label={
              <Typography sx={{ fontWeight: 'bold' }}>Core slice inside local data center and under MNO control.</Typography>
            } />
            <BoxInsideRadio>
              <Typography>This option allows you to transfer specific mobile network resources (functions) to the nearest data center and let your mobile network operator to manage and control this slice. It can be used to reduce latency or provide higher connectivity speed.</Typography>
              <Box sx={selectedCore !== 'local' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography>Select data center</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={selectedCore !== 'local'}
                      sx={{ width: '100%' }}
                      size="small"
                      select
                      label="Select"
                      value={selectedDataCenterWithLocal}
                      onChange={(event) => setSelectedDataCenterWithLocal(event.target.value)}
                    >
                      <MenuItem value='nearest'>Nearest</MenuItem>
                      <MenuItem value='Војводе Пријезде 20, Београд, Serbia'>Војводе Пријезде 20, Београд, Serbia</MenuItem>
                      <MenuItem value='Јанка Чмелика 105, Нови Сад, Serbia'>Јанка Чмелика 105, Нови Сад, Serbia</MenuItem>
                    </StyledTextField>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={selectedCore !== 'local' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: 1 }}>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4} sx={{ mt: 1 }}>
                    <Typography>Route my data plane</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RadioGroup
                      name="fallback-operator-radio-buttons-group"
                      value={selectedTrafficWithLocal}
                      onChange={handleTrafficWithLocalChange}
                    >
                      <FormControlLabel disabled={selectedCore !== 'local'} value="public" control={
                        <Radio style={selectedCore === 'local' ? { color: 'black' } : {}} />
                      } label={
                        <Typography>to public (Internet)</Typography>
                      } />
                      <FormControlLabel disabled={selectedCore !== 'local'} value="VPN" control={
                        <Radio style={selectedCore === 'local' ? { color: 'black' } : {}} />
                      } label={
                        <Typography>to VPN</Typography>
                      } />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={!isFallbackWithLocalActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: 1 }}>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4} sx={{ mt: 1 }}>
                    <Typography>Fallback scenario,</Typography>
                    <Typography>if my VPN fails,</Typography>
                    <Typography>route data plane</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RadioGroup
                      name="fallback-operator-radio-buttons-group"
                      value={selectedFallbackWithLocal}
                      onChange={handleFallbackWithLocalChange}
                    >
                      <FormControlLabel disabled={!isFallbackWithLocalActive()} value="null" control={
                        <Radio style={isFallbackWithLocalActive() ? { color: 'black' } : {}} />
                      } label={
                        <Typography>to null (do nothing, drop traffic to null)</Typography>
                      } />
                      <FormControlLabel disabled={!isFallbackWithLocalActive()} value="public" control={
                        <Radio style={isFallbackWithLocalActive() ? { color: 'black' } : {}} />
                      } label={
                        <Typography>to public (Internet)</Typography>
                      } />
                      <FormControlLabel disabled={!isFallbackWithLocalActive()} value="VPN" control={
                        <Radio style={isFallbackWithLocalActive() ? { color: 'black' } : {}} />
                      } label={
                        <Typography>to backup VPN</Typography>
                      } />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Box>
            </BoxInsideRadio>
            <FormControlLabel value="transfer" control={<Radio style={{ color: 'black' }} />} label={
              <Typography sx={{ fontWeight: 'bold' }}>Core slice for installation on customer facility and under customer control.</Typography>
            } />
            <BoxInsideRadio>
              <Typography>This option should be used if you want to get your mobile data traffic right inside your local facility. The set of the requred functions like UPF and SMF will be under your full control with this slice. This core slice option can be used if you have specific security requirements or need ultra low latency for your connections. </Typography>
              <Box sx={selectedCore !== 'transfer' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 1 }}>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4} sx={{ mt: 1 }}>
                    <Typography>Which 5G core software will be used?</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RadioGroup
                      name="fallback-operator-radio-buttons-group"
                      value={selectedTransferCore}
                      onChange={handleTransferCoreChange}
                    >
                      <FormControlLabel disabled={selectedCore !== 'transfer'} value="operator" control={
                        <Radio style={selectedCore === 'transfer' ? { color: 'black' } : {}} />
                      } label={
                        <Typography>Download and use operator's core software</Typography>
                      } />
                      <FormControlLabel disabled={selectedCore !== 'transfer'} value="own" control={
                        <Radio style={selectedCore === 'transfer' ? { color: 'black' } : {}} />
                      } label={
                        <Typography>Use my own 3GPP-compatible core software</Typography>
                      } />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={!isFallbackWithTransferActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: 1 }}>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4} sx={{ mt: 1 }}>
                    <Typography>Fallback scenario,</Typography>
                    <Typography>if my local core fails</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <RadioGroup
                      name="fallback-operator-radio-buttons-group"
                      value={selectedFallbackWithTransfer}
                      onChange={handleFallbackWithTransferChange}
                    >
                      <FormControlLabel disabled={!isFallbackWithTransferActive()} value="null" control={
                        <Radio style={isFallbackWithTransferActive() ? { color: 'black' } : {}} />
                      } label={
                        <Typography>Route my traffic to null (do nothing, drop traffic to null)</Typography>
                      } />
                      <FormControlLabel disabled={!isFallbackWithTransferActive()} value="public" control={
                        <Radio style={isFallbackWithTransferActive() ? { color: 'black' } : {}} />
                      } label={
                        <Typography>Activate operator's core slice and route traffic to public (Internet)</Typography>
                      } />
                      <FormControlLabel disabled={!isFallbackWithTransferActive()} value="VPN" control={
                        <Radio style={isFallbackWithTransferActive() ? { color: 'black' } : {}} />
                      } label={
                        <Typography>Activate operator's core slice and route traffic to backup VPN</Typography>
                      } />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Box>
            </BoxInsideRadio>
            <FormControlLabel value="nothing" control={<Radio style={{ color: 'black' }} />} label={
              <Typography sx={{ fontWeight: 'bold' }}>I don't need a core slice</Typography>
            } />
            <BoxInsideRadio>
              <Typography>This option should be used if you selected some radio slice to guarantee connectivity (like slice for high density) but don't need to control your traffic on the border of MNO.</Typography>
            </BoxInsideRadio>
          </RadioGroup>
        </Grid>
      </Grid>
      <Box sx={{ mb: 2 }} />
    </Box >
  )
}

export default React.memo(CoreSliceTab)
