import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
import styles from "../styles.module.css";

export default function TextNFT() {
  return (
    <Box sx={{ maxHeight: "350px", overflowY: "auto" }}>
      <Typography variant="h4">
        What Is an NFT? Your Guide to Non-Fungible Tokens in 2024
      </Typography>
      <Typography variant="subtitle1" id="author" sx={{ marginBottom: "10px" }}>
        By Jessica Schulze (updated on Jan 30 2024)
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        NFTs are digital assets that are stored on a blockchain. They represent
        various forms of digital content and may even be tethered to physical
        assets. Ownership of these assets is recorded in the blockchain,
        creating an immutable record that enables the selling and trading of
        NFTs. If you are not yet familiar with blockchain technology, you can
        learn the basics in the article What Is a Blockchain Developer (and How
        Do I Become One?) and browse the glossary of terms at the bottom of this
        page.
      </Typography>
      <Typography
        variant="h5"
        className={styles.embedded_content_section_title}
      >
        What does NFT stand for?
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        NFT stands for non-fungible token. Although non-fungible tokens are
        widely regarded as a new technology, the first NFT was minted in 2014 by
        digital artist Kevin McCoy and tech entrepreneur Anil Dash. You can
        trace the origins of NFTs even further back to 2012 when Meni Rosenfeld
        published the "Colored Coins" whitepaper. “Colored Coins” describes the
        methodology for representing and managing the ownership of real-world
        assets on a blockchain.
      </Typography>
      <Typography
        variant="h6"
        className={styles.embedded_content_sub_section_title}
      >
        What does non-fungible mean?
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        The term “non-fungible” is not limited to the NFT space. It is also used
        to describe assets in law, finance, or commerce that are difficult to
        exchange with similar goods. In other words, non-fungible assets are
        unique. You cannot replace them with similar items. Diamonds are a great
        non-digital example of a non-fungible good. Many different cuts, grades,
        and styles of diamonds exist. These qualities make them unique and
        non-interchangeable with other diamonds.
      </Typography>
      <Typography
        variant="h6"
        className={styles.embedded_content_sub_section_title}
      >
        Non-fungible vs. fungible
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        In contrast, bills in US currency are an example of a fungible good. You
        can exchange one $50 bill for five $10 bills or two $20 bills and two $5
        bills. Anything that is mutually interchangeable can be described as
        fungible. Fungible goods are easily replaced with items of identical or
        practically identical value.{" "}
      </Typography>
      <Typography
        variant="h6"
        className={styles.embedded_content_sub_section_title}
      >
        What is a non-fungible token?
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        A non-fungible token is a digital identifier recorded in the blockchain.
        It cannot be copied, substituted, or changed. Non-fungible tokens
        validate the authenticity and ownership of a digital asset. Essentially,
        a non-fungible token is proof of ownership. This type of certificate is
        digital and cannot be altered due to the nature of blockchains.{" "}
      </Typography>
      <Typography
        variant="h5"
        className={styles.embedded_content_section_title}
      >
        What is an NFT?
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        <strong>
          NFTs are proof of an asset’s purchase. They are not the asset itself.
        </strong>
        These circumstances mean that you can create an NFT out of virtually
        anything. In addition to digital objects, you can use a digital object
        to represent a tangible item. Here are a few examples of things that can
        (and have been) turned into NFTs:
      </Typography>
      <List>
        <ListItem>
          &bull;&nbsp;Digital content like video clips and social media posts
        </ListItem>
        <ListItem>&bull;&nbsp;Media files such as GIFs</ListItem>
        <ListItem>
          &bull;&nbsp;Video game items like avatars and skins{" "}
        </ListItem>
        <ListItem>&bull;&nbsp;Digitized fashion such as NFT sneakers</ListItem>
      </List>
      <Typography
        variant="h6"
        className={styles.embedded_content_sub_section_title}
      >
        The difference between cryptocurrency and NFTs
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Despite their similarities, cryptocurrency and NFTs are not the same
        thing. Cryptocurrency is, however, a digital currency used for trading
        NFTs. The primary difference between cryptocurrency and NFTs lies in
        their value. The value of cryptocurrency depends on its utility, similar
        to the US dollar. If every merchant in the US decided to stop accepting
        US dollars, their value would plummet because they are purely
        economical. NFTs have both economic and non-economic value. Since an NFT
        can represent anything from artwork to a video game, its value depends
        on factors like investors, collectors, and rarity.
      </Typography>
      <Typography
        variant="h6"
        className={styles.embedded_content_sub_section_title}
      >
        Examples of NFTs
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        The list below contains a few of the most widely recognized NFTs and NFT
        collections.
      </Typography>
      <List>
        <ListItem>
          &bull;&nbsp;Cryptopunks. As one of the earliest NFT collections,
          Cryptopunks are well-known in the NFT space. Cryptopunk #8857 went
          viral in September of 2021 after selling for $6.63 million or 2000
          Ether (ETH), the Ethereum network’s cryptocurrency. One reason behind
          its staggering price tag is rarity—Cryptopunk #8857 is one of 88
          Zombie Cryptopunks in existence.
        </ListItem>
        <ListItem>
          &bull;&nbsp;Bored Ape Yacht Club. The Bored Ape Yacht Club is an
          iconic NFT collection thanks to its popularity among celebrities and
          high-profile athletes. Much of its notoriety derives from the usage of
          Bored Apes as profile pictures on social media. Notably, Bored Ape
          #3739 sold for $2.9 million in September 2021.{" "}
        </ListItem>
        <ListItem>
          &bull;&nbsp;Lazy Lions. Avatars from the Lazy Lions NFT collection are
          trendy among those in the NFT community. Upon their debut, between
          3,000 and 4,000 of the 10,000 Lazy Lion NFTs released sold in just
          five hours. As of July 2022, the most expensive NFT available from
          this collection is Lazy Lion #6632, currently listed for 2,000 ETH or
          $2,120,500.
        </ListItem>
      </List>
      <Typography
        variant="h6"
        className={styles.embedded_content_sub_section_title}
      >
        Why do NFTs look like that?
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        You may have noticed that mainstream NFTs look strikingly similar to one
        another. This phenomenon is due to the usage of layering and generative
        coding. Layering is the process of generating a set of images from a
        list of visual elements. For example, you might add “hat” and “shirt” to
        your list and produce variations like a cowboy hat, a polo shirt, a
        Hawaiian shirt, and a top hat. Then, you’d use a computer program or
        generative coding to stack each of these layers on top of each other in
        a randomized order. Creators can also input rules such as “if the avatar
        is wearing a top hat, it cannot also be wearing a Hawaiian shirt.”{" "}
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        These rules and variations make it possible to create thousands of
        unique avatars from a little over a hundred elements. Programmatically
        generated NFTs are similar to randomizing a character when playing a
        role-playing video game (RPG). RPGs often include hundreds of options
        for clothing, facial features, and accessories. Choosing to randomize
        your character rather than customize it will prompt the game to generate
        a random combination of each element for you.
      </Typography>
      <Typography
        variant="h5"
        className={styles.embedded_content_section_title}
      >
        Why are NFTs so expensive?
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        The value of an NFT depends on many different characteristics. A few
        contributing factors include:
      </Typography>
      <List>
        <ListItem>&bull;&nbsp;The source's credibility</ListItem>
        <ListItem>&bull;&nbsp;The artist's relevancy</ListItem>
        <ListItem>&bull;&nbsp;The current market for NFTs</ListItem>
        <ListItem>&bull;&nbsp;The utility of the NFT</ListItem>
      </List>
      <Typography
        variant="h5"
        className={styles.embedded_content_section_title}
      >
        Why do people buy NFTs?
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        The reasoning behind an NFT purchase is likely to vary significantly
        from one person to another. Since NFTs can be made from collectible
        items, personal preferences or brand loyalty can drive investments. Some
        NFT collections strive to create an exclusive community of owners,
        driving sales among those who want to join. Ultimately, buying an NFT is
        a personal choice.{" "}
      </Typography>
      <Typography
        variant="h6"
        className={styles.embedded_content_sub_section_title}
      >
        Pros of NFTs
      </Typography>
      <List>
        <ListItem>
          &bull;&nbsp;Decentralization. Like Cryptocurrency, NFT selling and
          trading are not controlled by a central authority. Instead, each
          member of the blockchain network receives a copy of identical,
          immutable data (in the form of a distributed ledger). This removes the
          need for a mediating party because it enables people to execute
          transactions without trusting one another. You can learn more about
          decentralized finance by taking an online course like Decentralized
          Finance (DeFi): The Future of Finance Specialization offered by Duke
          University.
        </ListItem>
        <ListItem>
          &bull;&nbsp;Networking. Depending on the creator of the NFT,
          real-world perks could be tethered to purchases from their collection.
          Examples of these perks include access to exclusive events and
          membership in groups or associations.
        </ListItem>
        <ListItem>
          &bull;&nbsp;Artist advocacy. Anil Dash, co-creator of the first NFT,
          was working as a consultant to auction houses and media companies at
          the time of the idea's conception. Dash wrote for the Atlantic that
          this role had him "obsessively thinking about the provenance,
          ownership, distribution, and control of artworks." NFTs were meant to
          use blockchain technology to protect artists from exploitation.
          Instead of working with third-party companies who often siphon
          earnings, NFTs aimed to help artists protect their creations by
          connecting them with sellers and investors directly.
        </ListItem>
      </List>
      <Typography
        variant="h6"
        className={styles.embedded_content_sub_section_title}
      >
        Cons of NFTs
      </Typography>
      <List>
        <ListItem>
          &bull;&nbsp;Environmental impact.NFTs are traded with major cryptocurrencies like Bitcoin and Ether (ETH). These cryptocurrencies use a protocol called Proof of Work to validate transactions. In short, Proof of Work is like a mathematical puzzle that proves a certain amount of computational power has been expended, thus confirming the validity of a blockchain transaction. This process is often called mining. As the networks grow, the puzzles become more challenging and require more computational power for miners to solve. According to some environmental advocates and financial regulators, the energy it takes to uphold this digital economy is not sustainable [2]. In 2020 alone, mining consumed more energy than the entirety of Switzerland [3].
        </ListItem>
        <ListItem>
          &bull;&nbsp;Community impact. Energy is expensive, leading miners to relocate their operations to areas with cheaper energy costs. These mining operations can drive up energy costs for locals and cause cities to exceed their hydropower quota. Depending on the extensiveness of the hardware, mining operations can also generate a constant, tangible vibration in the area [4].
        </ListItem>
        <ListItem>
          &bull;&nbsp;Legal rights. When an NFT is purchased, the owner obtains the rights to the digital asset that lives on the blockchain. They do not receive legal rights to the underlying content. If another party trademarks the artwork or item that an NFT represents, that party retains control over the legal rights of the intellectual property (IP) regardless of who owns the NFT.
        </ListItem>
        <ListItem>
          &bull;&nbsp;Value fluctuation. Since NFT value is not purely economic, it can fluctuate based on the current social climate. For example, Jack Dorsey, co-founder of Twitter, sold his first-ever tweet as an NFT last year for over $2.9 million. Today, Dorsey's NFT tweet is owned by crypto entrepreneur Sina Estavi. He listed the NFT for sale at $48 million and closed the auction with just seven total bids ranging between $5-$277.
        </ListItem>
      </List>
      <Typography
        variant="h5"
        className={styles.embedded_content_section_title}
      >Key takeaways</Typography>
      <List>
        <ListItem>
          &bull;&nbsp;NFTs are digital assets that are stored on a blockchain. They act as certificates of ownership and authenticity over an object, tangible or intangible.
        </ListItem>
        <ListItem>
          &bull;&nbsp;NFTs and cryptocurrency are not the same. NFTs are traded using cryptocurrency.
        </ListItem>
        <ListItem>
          &bull;&nbsp;The value of an NFT hinges on several factors, including social relevancy and scarcity.
        </ListItem>
        <ListItem>
          &bull;&nbsp;Purchasing an NFT does not inherently provide you with the rights to the artwork or asset that the NFT represents.
        </ListItem>
      </List>
    </Box>
  );
}
