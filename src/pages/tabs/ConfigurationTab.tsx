import React, { useContext } from 'react';
import { Button, Stack, Grid, TextField, Tabs, Tab, Box, Typography, Divider, styled } from '@mui/material';
import { Radio, RadioGroup, MenuItem, FormControlLabel, Checkbox, InputAdornment, IconButton } from '@mui/material';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import { useMediaQuery, useTheme } from '@mui/material';
import { alpha } from "@mui/material";
import { useRouter } from 'next/router';
import Geography from '@/pages/tabs/GeographyTab';
import { HeaderText, StyledButton, StyledTextField, ReadOnlyStyledTextField, BoxInsideRadio } from '@/components/generalComponents';
import { MyContext } from '@/context/myContext';
import ContentCopySharpIcon from '@mui/icons-material/ContentCopySharp';

function ConfigurationTab() {
  const { selectedCore } = useContext(MyContext)
  const { selectedRadio } = useContext(MyContext)
  const { selectedTrafficWithOperator, selectedTrafficWithLocal } = useContext(MyContext)
  const { selectedFallbackWithOperator, selectedFallbackWithLocal } = useContext(MyContext)
  const { selectedFallbackWithTransfer } = useContext(MyContext)
  const { selectedTransferCore } = useContext(MyContext)

  const { selectedImsi, setSelectedImsi } = useContext(MyContext)

  function isAnyRadioActive() {
    return selectedRadio !== 'nothing'
  }

  function isAnyCoreActive() {
    return selectedCore !== 'nothing'
  }

  function isPrimaryVpnActive() {
    return isAnyCoreActive()
  }

  function isSecondaryVpnActive() {
    return isAnyCoreActive()
  }

  function isN6InterfaceActive() {
    return selectedCore === 'operator' || selectedCore === 'local'
  }

  function isN3N4InterfaceActive() {
    return selectedCore === 'transfer'
  }

  function isDownloadConfigurationsActive() {
    return selectedCore === 'transfer'
  }

  // function isCoreWithVpnActive() {
  //   return (selectedCore === 'operator' && selectedTrafficWithOperator === 'VPN')
  //     || (selectedCore === 'local' && selectedTrafficWithLocal === 'VPN')
  // }

  // function isPrimaryVpnActive() {
  //   return isCoreWithVpnActive() || isTransferCoreActive()
  // }

  // function isSecondaryVpnActive() {
  //   return (selectedCore === 'operator' && selectedTrafficWithOperator === 'VPN' && selectedFallbackWithOperator === 'VPN')
  //     || (selectedCore === 'local' && selectedTrafficWithLocal === 'VPN' && selectedFallbackWithLocal === 'VPN')
  //     || (isTransferCoreActive() && selectedFallbackWithTransfer === 'VPN')
  // }

  // function isTransferCoreActive() {
  //   return selectedCore === 'transfer';
  // }

  // function isCoreFallbackVpnActive() {
  //   return (selectedCore === 'operator' && selectedTrafficWithOperator === 'VPN' && selectedFallbackWithOperator !== 'null')
  //     || (selectedCore === 'local' && selectedTrafficWithLocal === 'VPN' && selectedFallbackWithLocal !== 'null')
  // }

  // function isActivateCoreSliceMsActive() {
  //   return isTransferCoreActive() && selectedFallbackWithTransfer !== 'null'
  // }

  // function isRerouteTrafficMsActive() {
  //   return (isTransferCoreActive() && selectedFallbackWithTransfer !== 'null') || isCoreFallbackVpnActive()
  // }

  const handleImsiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImsi((event.target as HTMLInputElement).value);
  };

  return (
    <Box
      component="form"
      sx={{ width: '100%', }}
      noValidate
      autoComplete="off"
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <HeaderText>Device selection</HeaderText>
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography>Configure the list of the devices to use in your slice (IMSI-based list)</Typography>
        </Grid>
        <Grid item xs={12} lg={2} />
        <Grid item xs={12} lg={7}>
          <RadioGroup
            value={selectedImsi}
            onChange={handleImsiChange}
          >
            <FormControlLabel value="operator" control={
              <Radio style={{ color: 'black' }} />
            } label={
              <Typography sx={{ fontWeight: 'bold' }}>Upload from your mobile network operator account</Typography>
            } />
            <BoxInsideRadio>
              <Typography>Link an account in the operator's personal account to register devices (IMSI) for the slice.</Typography>
              <Box sx={selectedImsi !== 'operator' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 0.5 }}>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={10}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StyledButton variant='outlined' disabled={selectedImsi !== 'operator'}>Connect</StyledButton>
                      <Typography sx={{ ml: 3 }}>Now connected to: "account"</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </BoxInsideRadio>
            <FormControlLabel value="manual" control={
              <Radio style={{ color: 'black' }} />
            } label={
              <Typography sx={{ fontWeight: 'bold' }}>Enter manually</Typography>
            } />
            <BoxInsideRadio>
              <Box sx={selectedImsi !== 'manual' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 0.5 }}>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={10}>
                    <StyledTextField disabled={selectedImsi !== 'manual'}
                      sx={{ width: '100%' }}
                      id="outlined-textarea"
                      label="IMSI list"
                      defaultValue={`3650511
7161003`}
                      multiline
                    />
                  </Grid>
                </Grid>
              </Box>
            </BoxInsideRadio>
            <FormControlLabel value="CSV" control={
              <Radio style={{ color: 'black' }} />
            } label={
              <Typography sx={{ fontWeight: 'bold' }}>Upload a CVS file</Typography>
            } />
            <BoxInsideRadio>
              <Box sx={selectedImsi !== 'CSV' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ mt: 0.5 }}>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={10}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StyledButton variant="outlined" disabled={selectedImsi !== 'CSV'} component="label">
                        Upload
                        <input hidden accept=".csv" multiple type="file" />
                      </StyledButton>
                      <Typography sx={{ ml: 3 }}>Uploaded file: jfkewoijer.csv</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </BoxInsideRadio>
          </RadioGroup>
        </Grid>
      </Grid>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <HeaderText>Device attachment to the slice</HeaderText>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography>Click the button to send a command to attach devices to the slice based on the list of the device ID (IMSI) above.</Typography>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <BoxInsideRadio sx={{ ml: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StyledButton variant='outlined'>Send attach command</StyledButton>
                <Typography sx={{ ml: 3 }}>Last command sent on 2023.04.15 17:01:15</Typography>
              </Box>
            </BoxInsideRadio>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <HeaderText sx={{ fontSize: '1.3rem' }}>Radio slice configuration</HeaderText>
          </Grid>
          <Grid item xs={12} lg={9} sx={{ mb: 2 }}>
            <Box sx={!isAnyRadioActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
              <Typography>There is no separate configuration for the radio slice except options you selected on the radio slice page.</Typography>
              <Typography>Please note that if you want to route traffic of your mobile devices to your local facility, you need to activate core slice in addition to your radio slice.</Typography>
              <Typography sx={{ mt: 2 }}>You can access the list of the 5G base stations that serves your radio slice. It can be useful for security or some other configuration reasons.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={3} />
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <BoxInsideRadio sx={{ ml: 0 }}>
              <Stack direction='row' spacing={2}>
                <StyledButton variant='outlined' disabled={!isAnyRadioActive()}>Download</StyledButton>
                <StyledButton variant='outlined' disabled={!isAnyRadioActive()}>Access the list via API</StyledButton>
              </Stack>
            </BoxInsideRadio>
          </Grid>
        </Grid>
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sx={{ mt: 2, mb: 4 }}>
          <HeaderText sx={{ fontSize: '1.3rem' }}>Core slice configuration</HeaderText>
        </Grid>
      </Grid>
      <Box sx={!isPrimaryVpnActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <HeaderText>Primary VPN configuration</HeaderText>
          </Grid>
          <Grid item xs={12}>
            <Typography>This VPN will be used as primary link to exchange traffic between your mobile devices and your local resources.</Typography>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <Box sx={{ mt: 2 }}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} lg={4}>
                  <Typography>Customer VPN endpoint IP address</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <StyledTextField disabled={!isPrimaryVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="Enter IP address"
                    defaultValue=""
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography>Customer VPN public key</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <StyledTextField disabled={!isPrimaryVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="Enter VPN public key"
                    defaultValue=""
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography>Operator VPN endpoint IP address</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <ReadOnlyStyledTextField disabled={!isPrimaryVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="IP address (copy)"
                    defaultValue="12.34.56.78"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton disableRipple disabled={!isPrimaryVpnActive()}>
                            <ContentCopySharpIcon />
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography>Operator VPN public key</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <ReadOnlyStyledTextField disabled={!isPrimaryVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="VPN public key (copy)"
                    defaultValue="mjD_ObsTlRU8L-qnD4OeCmyliHIB3MHg="
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton disableRipple disabled={!isPrimaryVpnActive()}>
                            <ContentCopySharpIcon />
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography>Preassigned IP subnets for 5G devices</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <ReadOnlyStyledTextField disabled={!isPrimaryVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="IP subnet (copy)"
                    defaultValue="10.0.0.0/8"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton disableRipple disabled={!isPrimaryVpnActive()}>
                            <ContentCopySharpIcon />
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography>Preassigned IP subnet for sliced 5G core functions</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <ReadOnlyStyledTextField disabled={!isPrimaryVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="IP subnet (copy)"
                    defaultValue="172.17.17.0/24"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton disableRipple disabled={!isPrimaryVpnActive()}>
                            <ContentCopySharpIcon />
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <BoxInsideRadio />
      </Box>
      <Box sx={!isSecondaryVpnActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <HeaderText>Secondary VPN configuration</HeaderText>
          </Grid>
          <Grid item xs={12}>
            <Typography>This VPN will be used as backup link to exchange traffic between your mobile devices and your local resources.</Typography>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <Box sx={{ mt: 2 }}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} lg={4}>
                  <Typography>Customer VPN endpoint IP address</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <StyledTextField disabled={!isSecondaryVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="Enter IP address"
                    defaultValue=""
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography>Customer VPN public key</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <StyledTextField disabled={!isSecondaryVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="Enter VPN public key"
                    defaultValue=""
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography>Operator VPN endpoint IP address</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <ReadOnlyStyledTextField disabled={!isSecondaryVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="IP address (copy)"
                    defaultValue="12.34.67.89"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton disableRipple disabled={!isSecondaryVpnActive()}>
                            <ContentCopySharpIcon />
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography>Operator VPN public key</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <ReadOnlyStyledTextField disabled={!isSecondaryVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="VPN public key (copy)"
                    defaultValue="mrJP08FDyGK1+9sqRgv5T/38TYNIH4ZR="
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton disableRipple disabled={!isSecondaryVpnActive()}>
                            <ContentCopySharpIcon />
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <BoxInsideRadio />
      </Box>
      <Box sx={!isN6InterfaceActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <HeaderText>5G core functions configuration - core slice on operator premises</HeaderText>
          </Grid>
          <Grid item xs={12}>
            <Typography>If you selected 5G core slice on the MNO premices or specific DC, traffic of your mobile device will be routed from this IP adresses.</Typography>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <Box sx={{ mt: 2 }}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} lg={4}>
                  <Typography>N6 interface, UPF to DN, primary IP address</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <ReadOnlyStyledTextField disabled={!isN6InterfaceActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="IP address (copy)"
                    defaultValue="172.17.17.21"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton disableRipple disabled={!isN6InterfaceActive()}>
                            <ContentCopySharpIcon />
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography>N6 interface, UPF to DN, secondary IP address</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <ReadOnlyStyledTextField disabled={!isN6InterfaceActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="IP address (copy)"
                    defaultValue="172.17.17.22"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton disableRipple disabled={!isN6InterfaceActive()}>
                            <ContentCopySharpIcon />
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <BoxInsideRadio />
      </Box>
      <Box sx={!isN3N4InterfaceActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <HeaderText>5G core functions configuration - slice on customer premises and under customer control</HeaderText>
          </Grid>
          <Grid item xs={12}>
            <Typography>You will need this IP address and secrets to connect your local 5G core functions to the MNO core.</Typography>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <Box sx={{ mt: 2 }}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} lg={5}>
                  <Typography>N3 interface, UPF to RAN, </Typography>
                  <Typography>customer UPF primary IP address</Typography>
                </Grid>
                <Grid item xs={12} lg={7}>
                  <StyledTextField disabled={!isN3N4InterfaceActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="Enter IP address"
                    defaultValue=""
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Typography>N3 interface, UPF to RAN, </Typography>
                  <Typography>customer UPF secondary IP address</Typography>
                </Grid>
                <Grid item xs={12} lg={7}>
                  <StyledTextField disabled={!isN3N4InterfaceActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="Enter IP address"
                    defaultValue=""
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Typography>N4 interface, UPF to SMF, </Typography>
                  <Typography>customer UPF primary IP address</Typography>
                </Grid>
                <Grid item xs={12} lg={7}>
                  <StyledTextField disabled={!isN3N4InterfaceActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="Enter IP address"
                    defaultValue=""
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Typography>N4 interface, UPF to SMF, </Typography>
                  <Typography>customer UPF secondary IP address</Typography>
                </Grid>
                <Grid item xs={12} lg={7}>
                  <StyledTextField disabled={!isN3N4InterfaceActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="Enter IP address"
                    defaultValue=""
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Typography>N4 interface, UPF to SMF, </Typography>
                  <Typography>operator SMF primary IP address</Typography>
                </Grid>
                <Grid item xs={12} lg={7}>
                  <ReadOnlyStyledTextField disabled={!isN3N4InterfaceActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="IP address (copy)"
                    defaultValue="172.17.17.31"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton disableRipple disabled={!isN3N4InterfaceActive()}>
                            <ContentCopySharpIcon />
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Typography>N4 interface, UPF to SMF, </Typography>
                  <Typography>operator SMF secondary IP address</Typography>
                </Grid>
                <Grid item xs={12} lg={7}>
                  <ReadOnlyStyledTextField disabled={!isN3N4InterfaceActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="IP address (copy)"
                    defaultValue="172.17.17.32"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      endAdornment:
                        <InputAdornment position='end'>
                          <IconButton disableRipple disabled={!isN3N4InterfaceActive()}>
                            <ContentCopySharpIcon />
                          </IconButton>
                        </InputAdornment>
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <BoxInsideRadio />
      </Box>
      <Box sx={!isDownloadConfigurationsActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
            <HeaderText>5G core functions configuration - slice on customer premises and under customer control</HeaderText>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <Stack spacing={2}>
              <StyledButton variant='outlined' disabled={!isDownloadConfigurationsActive()}>
                Download kubernetes containers, configurations and deploy charts of the 3GPP core supplied by MNO
              </StyledButton>
              <StyledButton variant='outlined' disabled={!isDownloadConfigurationsActive()}>
                Download configurations and secrets to use with your own 3GPP compatible 5G core
              </StyledButton>
            </Stack>
          </Grid>
        </Grid>
        <BoxInsideRadio />
      </Box>
      <Box sx={!isAnyCoreActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <HeaderText>5G core functions configuration - fallback timeouts</HeaderText>
          </Grid>
          <Grid item xs={12}>
            <Typography>You can overide change preset timeouts that is used to activate fallback scenarios</Typography>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <Box sx={{ mt: 2 }}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} lg={6}>
                  <Typography>Activate core slice on the operator side</Typography>
                  <Typography>and handle devices 5G mobile traffic</Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <StyledTextField disabled={!isAnyCoreActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="milliseconds"
                    defaultValue="100"
                    variant="outlined"
                    type='number'
                    InputProps={{
                      endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Typography>Deactivate core slice on the operator side </Typography>
                  <Typography>and stop handling devices 5G mobile traffic</Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <StyledTextField disabled={!isAnyCoreActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="milliseconds"
                    defaultValue="100"
                    variant="outlined"
                    type='number'
                    InputProps={{
                      endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Typography>Route traffic as selected in fallback scenario</Typography>
                  <Typography>if customer endpoint or sliced core</Typography>
                  <Typography>is not reachable</Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <StyledTextField disabled={!isAnyCoreActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="milliseconds"
                    defaultValue="100"
                    variant="outlined"
                    type='number'
                    InputProps={{
                      endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Typography>Reroute traffic back to customer endpoint </Typography>
                  <Typography>or sliced core after recovery</Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <StyledTextField disabled={!isAnyCoreActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="milliseconds"
                    defaultValue="100"
                    variant="outlined"
                    type='number'
                    InputProps={{
                      endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <BoxInsideRadio />
      </Box>
    </Box>
  )
}

export default React.memo(ConfigurationTab)
