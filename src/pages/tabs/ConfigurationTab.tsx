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

function ConfigurationTab() {
  const { selectedCore, setSelectedCore } = useContext(MyContext)
  const { selectedRadio, setSelectedRadio } = useContext(MyContext)
  const { selectedTrafficWithOperator, setSelectedTrafficWithOperator } = useContext(MyContext)
  const { selectedTrafficWithLocal, setSelectedTrafficWithLocal } = useContext(MyContext)

  const { selectedImsi, setSelectedImsi } = useContext(MyContext)

  function isCoreWithVpnActive() {
    return (selectedCore === 'operator' && selectedTrafficWithOperator === 'VPN')
      || (selectedCore === 'local' && selectedTrafficWithLocal === 'VPN')
  }

  function isTransferCoreActive() {
    return selectedCore === 'transfer';
  }

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
          <HeaderText>Configuration</HeaderText>
        </Grid>
        {/* <Grid item xs={12} sx={{ mt: 4 }} /> */}
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography>Configure the list of the devices to use in your slice (IMSI-based list)</Typography>
        </Grid>
        <Grid item xs={12} lg={2} />
        <Grid item xs={12} lg={7}>
          <RadioGroup
            name="fallback-operator-radio-buttons-group"
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
      <Box sx={selectedRadio === 'nothing' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <HeaderText>Radio slice configuration</HeaderText>
          </Grid>
          <Grid item xs={12} sx={{mb: 2}}>
            <Typography>Send a command to the devices about switching to radio slice.</Typography>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <BoxInsideRadio>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StyledButton variant='outlined' disabled={selectedRadio === 'nothing'}>Send</StyledButton>
                <Typography sx={{ ml: 3 }}>Last command send on 2023.04.15 17:01:15</Typography>
              </Box>
            </BoxInsideRadio>
          </Grid>
        </Grid>
      </Box>
      <Box sx={!isCoreWithVpnActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sx={{ mt: 4 }}>
            <HeaderText>Core slice with VPN configuration</HeaderText>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <Box sx={{ mt: 2 }}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} lg={4}>
                  <Typography>Specify the IP address of the VPN endpoint</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <StyledTextField disabled={!isCoreWithVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="IP address"
                    defaultValue="0.0.0.0"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography>Specify the VPN public key</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <StyledTextField disabled={!isCoreWithVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="VPN public key"
                    defaultValue=""
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box sx={'selectedFallback' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography>Specify the IP address of the backup VPN endpoint</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={'selectedFallback'}
                      sx={{ width: '100%' }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography>Specify the public key of the backup VPN</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={'selectedFallback'}
                      sx={{ width: '100%' }}
                      size="small"
                      label="VPN public key"
                      defaultValue=""
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} lg={4}>
                  <Typography>IP address of the subscriber devices subnet</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <StyledTextField disabled={!isCoreWithVpnActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="IP address"
                    defaultValue="0.0.0.0"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={12}>
                    <Typography sx={{ fontWeight: 'bold' }}>For copying:</Typography>
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography>IP address of the operator's VPN endpoint</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={!isCoreWithVpnActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography>Public key of the operator's VPN endpoint</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={!isCoreWithVpnActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="Public key"
                      defaultValue="some public key"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography component={'span'}>IP address of the gateway on the <Typography sx={{ textDecoration: 'underline' }} display="inline">subscriber's</Typography> side</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={!isCoreWithVpnActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography component={'span'}>IP address of the gateway on the <Typography sx={{ textDecoration: 'underline' }} display="inline">operator's</Typography> side</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={!isCoreWithVpnActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} lg={4}>
                      <Typography>The location of the outer core</Typography>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      <StyledTextField disabled={!isCoreWithVpnActive()}
                        sx={{ width: '100%' }}
                        size="small"
                        select
                        label="Select"
                        defaultValue="1"
                      >
                        <MenuItem key='nearest' value='nearest'>Nearest</MenuItem>
                        <MenuItem key='1' value='1'>221B Baker Street, London</MenuItem>
                      </StyledTextField>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <BoxInsideRadio />
      </Box>
      <Box sx={!isTransferCoreActive() ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <HeaderText>Transferred core slice configuration</HeaderText>
          </Grid>
          <Grid item xs={12} lg={2} />
          <Grid item xs={12} lg={7}>
            <Box sx={{ mt: 2 }}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} lg={4}>
                  <Typography>Specify the public IP address of the VPN endpoint</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <StyledTextField disabled={!isTransferCoreActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="IP address"
                    defaultValue="0.0.0.0"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Typography>Specify the VPN public key</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <StyledTextField disabled={!isTransferCoreActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="VPN public key"
                    defaultValue=""
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box sx={'selectedFallback' ? { '& .MuiTypography-root': { color: alpha('#000000', 0.38) } } : {}}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography>Specify the public IP address of the backup VPN endpoint</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={'selectedFallback'}
                      sx={{ width: '100%' }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography>Specify the public key of the backup VPN</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={'selectedFallback'}
                      sx={{ width: '100%' }}
                      size="small"
                      label="VPN public key"
                      defaultValue=""
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} lg={4}>
                  <Typography>Private IP subnet (subnets) VNF on the subscriber side</Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <StyledTextField disabled={!isTransferCoreActive()}
                    sx={{ width: '100%' }}
                    size="small"
                    label="IP address"
                    defaultValue="0.0.0.0"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={12}>
                    <Typography sx={{ fontWeight: 'bold' }}>For copying:</Typography>
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={5}>
                    <Typography>Private IP address of the operator's VPN endpoint - 5G Core</Typography>
                  </Grid>
                  <Grid item xs={12} lg={5}>
                    <StyledTextField disabled={!isTransferCoreActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={5}>
                    <Typography>Public key of the operator's VPN endpoint - 5G Core</Typography>
                  </Grid>
                  <Grid item xs={12} lg={5}>
                    <StyledTextField disabled={!isTransferCoreActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="Public key"
                      defaultValue="some public key"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={5}>
                    <Typography component={'span'}>Private IP address of the gateway on the <Typography sx={{ textDecoration: 'underline' }} display="inline">subscriber's</Typography> side</Typography>
                  </Grid>
                  <Grid item xs={12} lg={5}>
                    <StyledTextField disabled={!isTransferCoreActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={5}>
                    <Typography component={'span'}>Private IP address of the gateway on the <Typography sx={{ textDecoration: 'underline' }} display="inline">operator's</Typography> side</Typography>
                  </Grid>
                  <Grid item xs={12} lg={5}>
                    <StyledTextField disabled={!isTransferCoreActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography>NVF 5G core private IP addresses:</Typography>
                    <Typography>IP addresses of network functions:</Typography>
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography>Network function 1</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={!isTransferCoreActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography>Network function 2</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={!isTransferCoreActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography>Network function 3</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={!isTransferCoreActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Typography>Public IP addresses (subnets) of the RAN, from which incoming traffic of devices via the N2 and N3 interface to the local 5G core on the subscriber side should be allowed:</Typography>
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography>N2</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={!isTransferCoreActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} lg={2} />
                  <Grid item xs={12} lg={4}>
                    <Typography>N3</Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <StyledTextField disabled={!isTransferCoreActive()}
                      sx={{ width: '100%' }}
                      InputProps={{ readOnly: true, }}
                      size="small"
                      label="IP address"
                      defaultValue="0.0.0.0"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <Grid container rowSpacing={2} columnSpacing={{ xs: 1 }} sx={{ mt: '2px', display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} lg={6}>
                      <Typography>Specify public IP addresses for connection from the RAN side via the N2 interface</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Typography>Specify public IP addresses for connection from the RAN side via the N3 interface</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        size="small"
                        label="IP address"
                        defaultValue="0.0.0.0"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <Typography sx={{ fontWeight: 'bold' }}>Fallback:</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Typography>Select a fallback scenario in case the kernel functions are disabled on the subscriber's side</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={true}
                        sx={{ width: '100%' }}
                        size="small"
                        select
                        label="Select"
                        defaultValue="nothing"
                      >
                        <MenuItem key='nearest' value='nothing'>do nothing, terminate access for subscribers</MenuItem>
                        <MenuItem key='backup' value='backup'>redirect traffic to the main core of the operator and send it to the VPN tunnel to the IP address of the gateway on the subscriber's side</MenuItem>
                        <MenuItem key='public' value='public'>redirect traffic to the main core of the operator and send it to the public network (Internet)</MenuItem>
                      </StyledTextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Typography>The number of seconds before the fallback scenario is activated after a crash</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        size="small"
                        label="Seconds"
                        defaultValue="30"
                      >
                      </StyledTextField>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Typography>The number of seconds before returning to the main scenario after recovery</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <StyledTextField disabled={!isTransferCoreActive()}
                        sx={{ width: '100%' }}
                        size="small"
                        label="Seconds"
                        defaultValue="30"
                      >
                        <MenuItem key='nearest' value='nothing'>do nothing, terminate access for subscribers</MenuItem>
                        <MenuItem key='backup' value='backup'>redirect traffic to the main core of the operator and send it to the VPN tunnel to the IP address of the gateway on the subscriber's side</MenuItem>
                        <MenuItem key='public' value='public'>redirect traffic to the main core of the operator and send it to the public network (Internet)</MenuItem>
                      </StyledTextField>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <BoxInsideRadio />
    </Box>
  )
}

export default React.memo(ConfigurationTab)