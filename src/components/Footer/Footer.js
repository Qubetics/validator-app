import React from "react";
import { Grid, Typography, Link, Container } from "@mui/material";
import {
  FooterSection,
  FooterItemInner,
  FooterItem,
  SocialLinks,
  Copyright,
  SocialLinksInner,
} from "./styles";
import logo from "../../assets/Images/logo.svg";
import {
  FacebookIcon,
  InstaIcon,
  DiscordIcon,
  SocialIcon,
  TelegramIcon,
  TwitterIcon,
} from "../../assets/Icons/SvgIcon";
import { BASE_URL } from "../../constant";
const Footer = () => {
  return (
    <FooterItem>
      <FooterItemInner>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} lg={4}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                <img src={logo} alt="imgs" />
              </Typography>
              <Typography variant="body2">
                Build without limits. Qubetics an interoperable ecosystem
                uniting all leading networks.
              </Typography>
            </FooterSection>
          </Grid>
          <Grid item xs={12} sm={6} lg={1.5}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <a
                href={`${BASE_URL.EXPLORER_NAVIGATION_URL}/token`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tokens
              </a>
              <a
                href={`${BASE_URL.EXPLORER_NAVIGATION_URL}/tx`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Transaction
              </a>
              <a
                href={`${BASE_URL.EXPLORER_NAVIGATION_URL}/validators`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Validators
              </a>
              <a
                href={`${BASE_URL.EXPLORER_NAVIGATION_URL}/dashboard`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Analytics
              </a>
              <a
                href={`${BASE_URL.EXPLORER_NAVIGATION_URL}/nodes`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Nodes
              </a>
            </FooterSection>
          </Grid>
          <Grid item xs={12} sm={6} lg={1.5}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <a
                href="https://www.qubetics.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.qubetics.com/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>
            </FooterSection>
          </Grid>
          <Grid item xs={12} sm={6} lg={2}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Product & Services
              </Typography>
              <a
                href="http://validator-testnet.qubetics.work/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Qubetics Validator App{" "}
              </a>
              <a
                href="http://delegator-testnet.qubetics.work/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Qubetics Delegator App
              </a>
              <a
                href="https://testnet-qubecode-ide.qubetics.work/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Qubetics IDE
              </a>
              <a
                href="https://qubeqode-basic-testnet.qubetics.work/work-space"
                target="_blank"
                rel="noopener noreferrer"
              >
                QubeQode
              </a>
              <Link to="/">Qubetics DEX</Link>
              <Link to="/">Qubetics App</Link>
            </FooterSection>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Resources
              </Typography>

              <a
                href="https://www.qubetics.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Official Web
              </a>
              <Link to="/" underline="none">
                Qubetics Network Documentations
              </Link>
              <a
                href=" https://qubetics.gitbook.io/qubetics-docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Qubetics Documentations
              </a>

              <a
                href="https://github.com/Qubetics"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </FooterSection>
          </Grid>
        </Grid>
        <SocialLinks>
          <Typography variant="h6" gutterBottom>
            Get in touch!
          </Typography>
          <SocialLinksInner>
            <a
              href="https://x.com/qubetics"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon />
            </a>
            <a
              href="https://www.instagram.com/qubetics"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstaIcon />
            </a>
            <a
              href="https://www.tiktok.com"
              aria-label="Telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon />
            </a>
            <a
              href="https://t.me/qubetics"
              aria-label="Discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TelegramIcon />
            </a>
            <a
              href="https://discord.com/invite/KHfSNbzdSE"
              aria-label="Discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordIcon />
            </a>
          </SocialLinksInner>
        </SocialLinks>
        <Copyright>
          <Typography variant="body2">
            &copy;2025 Copyright Qubetics. All rights reserved.
          </Typography>
        </Copyright>
      </FooterItemInner>
    </FooterItem>
  );
};

export default Footer;
