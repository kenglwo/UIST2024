import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
import styles from "../styles.module.css";

export default function TextSemiotics () {
  return (
    <Box sx={{ overflowY: "auto" }}>
      <Typography variant="h4" id="content_sec0" sx={{mb: 3}}>
        Semiotics
      </Typography>
      <Typography
        id="content_sec1"
        variant="h5"
        className={styles.embedded_content_section_title}
      >
        Semiotics: definition
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Semiotics is the study of visual language and signs. It looks at how meaning is created, not just with words but
        also with images, symbols, gestures, sounds, and design.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        We use semiotics to look at how different modes of communication (e.g. language, visuals, or gestures) work
        together to create <b>meaning in context</b>. This means that <b>where</b> and <b>when</b> we observe signs will
        impact their meaning. For example, a thumbs-up gesture usually means 'okay', but if seen at the side of the
        road, it means the person is looking for a free ride in a stranger's car!
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          component="img"
          sx={{
            m: 3,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="img"
          src="/images/semiotics/Fig1.webp"
        />
      <Typography variant="caption" sx={{m:"10px"}}>Fig. 1 - The meaning of the thumbs-up sign can change depending on the context.</Typography>
      </Box>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Semiotics can help us develop a deeper understanding of the world around us, including the media we see (e.g.
        films, news, adverts, novels). It helps us to recognise the <b>whole intended meaning of something.</b>
      </Typography>
      <Typography
        variant="h5"
        className={styles.embedded_content_section_title}
      >Signs in semiotics</Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        In semiotics we analyse <b>signs</b>, but what exactly are they?
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        In semiotics, the term signs can refer to anything that is used to <b>communicate meaning</b>. There is a wide
        variety of ways we as humans communicate meaning with each other, such as:
      </Typography>
      <List>
        <ListItem>
          &bull;&nbsp;<b>words</b>&nbsp;(e.g. the word breakfast is used to describe the meal we eat in the morning)
        </ListItem>
        <ListItem>&bull;&nbsp;<b>Images</b>&nbsp;(e.g. the images used alongside a news article will impact the readers' understanding of that article)</ListItem>
        <ListItem>&bull;&nbsp;<b>Colours</b>&nbsp;(e.g. the red light on a traffic light means <i>stop</i>)</ListItem>
        <ListItem>&bull;&nbsp;<b>Symbols</b>&nbsp;(e.g. the exclamation mark '!' can convey a sense of surprise or excitement)</ListItem>
        <ListItem>&bull;&nbsp;<b>Gestures</b>&nbsp;(e.g. a 'thumbs up' shows positivity)</ListItem>
        <ListItem>&bull;&nbsp;<b>Sounsd</b> &nbsp;(e.g. music played on the piano in the minor key can create a sense of sadness)</ListItem>
        <ListItem>&bull;&nbsp;<b>Fashion</b>&nbsp;(e.g. clothing can reveal a lot about a person's socioeconomic status)</ListItem>
      </List>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        The meaning of signs can differ depending on the <b>social situation</b> and the <b>cultural context.</b>
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        For example, whilst the 'thumbs up' gesture has positive connotations in many countries, it is considered
        offensive in Greece, Iran, Italy, and Iraq. Another example is the colour yellow.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        In the Western world (e.g. the UK and the USA), yellow is often associated with springtime and warmth; however,
        in Latin America (e.g. Mexico, Brazil, and Colombia) yellow can symbolise death and mourning. As you can see,
        it's important to study signs in context!
      </Typography>

      <Typography
        id="content_sec3"
        variant="h5"
        className={styles.embedded_content_section_title}
      >
        Semiotic theory
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        The Swiss linguist Ferdinand de Saussure (1857-1913) and the American philosopher Charles Sanders Peirce
        (1839–1914) are widely considered the founders of modern semiotics. In the early 1900s, Saussure introduced the
        concept of <b>signs</b> in semiotics. He suggested that each <b>sign</b> is made of two parts; the
        <b>signifier</b> and the <b>signified.</b>
      </Typography>
      <List>
        <ListItem>
          &bull;&nbsp;<b>Signifier = </b>&nbsp;The word, image, sound, or gesture representing a concept or meaning.
        </ListItem>
        <ListItem>&bull;&nbsp;<b>Signified = </b>&nbsp;The interpretation of the meaning of the signifier.</ListItem>
      </List>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        These two parts of a sign are always connected and cannot be separated.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Example
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        An example of a sign is the word '<i>dog</i>'.
      </Typography>
      <List>
        <ListItem>
          &bull;<b>The signifier</b>&nbsp; is the word '<i>dog</i>' itself.
        </ListItem>
        <ListItem>&bull;<b>The signified meaning</b>&nbsp; is the small furry mammal, often kept as a pet.</ListItem>
      </List>
       <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Example
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        A further example is this hand gesture:
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          component="img"
          sx={{
            m: 3,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="img"
          src="/images/semiotics/Fig2.webp"
        />
      <Typography variant="caption" sx={{m:"10px"}}>Fig. 2 - The 'okay' hand gesture.</Typography>
      </Box>
      <List>
        <ListItem> &bull;<b>The signifier</b>&nbsp; is the symbol made by joining the thumb and the index finger together. </ListItem>
        <ListItem>&bull;<b>The signified meaning</b>&nbsp; (in the Western world) is '<i>everything's okay</i>'.</ListItem>
      </List>
      <Typography
        id="content_sec1"
        variant="h6"
        className={styles.embedded_content_section_title}
      >
        Types of signifiers
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        According to Charles Sanders Peirce, <b>there</b> are three different signifiers; <b>Icons, Indexes,</b> and
        <b>Symbols.</b>
      </Typography>
      <Typography variant="subtitle1" className={styles.embedded_content_paragraph}>
        Icon signifier
      </Typography>

      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        An icon is a signifier with an obvious connection and physical resemblance to the signified thing. Photographs, illustrations, and maps are good examples of icon signifiers. 
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
          Example
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          component="img"
          sx={{
            m: 3,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="img"
          src="/images/semiotics/Fig3.png"
        />
        <Typography variant="caption" sx={{m:"10px"}}>Fig. 3 - Icon signifier used to represent the United Kingdom.
        This image is used to represent the United Kingdom. It is an icon signifier as it has an obvious and accurate resemblance to the physical shape of the United Kingdom.
      </Typography>
      </Box>
      <Typography variant="h6" className={styles.embedded_content_paragraph}>
        Index signifier
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Index signifiers are a little less obvious than icon signifiers. They are usually representations of the
        <b>relationship between the signified and the signifier</b>. The index signifier cannot exist without the
        presence of the signified. For example, smoke is an index signifier for fire.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Most of us know the relationship between smoke and fire and know that there cannot be any smoke without a fire.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
          Example
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          component="img"
          sx={{
            m: 3,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="img"
          src="/images/semiotics/Fig4.png"
        />
        <Typography variant="caption" sx={{m:"10px"}}>Fig. 4 - Danger of death image found on some household products. Many of you will have seen this image placed on the back of potentially dangerous household products, such
        as bleach.
      </Typography>
      </Box>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        The image is not a literal representation of what can be found in the bottle (i.e. the bottle of bleach
        isn't full of bones!); instead, it represents the relationship between the product and the user (i.e. if someone
        were to drink the bleach, they could die).
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        The understanding of index signifiers can either be <b>natural</b> or <b>learned</b>. For example, most of us
        know from a very young age that a frown suggests a person is unhappy. On the other hand, we have to learn that
        the skull and crossbones (shown above) represent death.
      </Typography>
      <Typography variant="h6" className={styles.embedded_content_sub_section_title}>
        Symbol signifier
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Symbol signifiers are the most abstract of the three, as there is no apparent connection between the signifier
        and the signified. Symbol signifiers can differ from country to country, and we have to take time to teach and
        learn their meaning.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Examples of symbol signifiers include the alphabet, numbers, and punctuation. 
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        For example, there is no physical or literal connection between the pound symbol (£) and money itself; however,
        it is a symbol that everyone in the UK will understand.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        For example, there is no physical or literal connection between the pound symbol (£) and money itself; however,
        it is a symbol that everyone in the UK will understand.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Example
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          component="img"
          sx={{
            m: 3,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="img"
          src="/images/semiotics/Fig5.png"
        />
        <Typography variant="caption" sx={{m:"10px"}}>Fig. 5 - The image of the caduceus signifies medicine.
        This is an image of the staff (stick) carried by the Greek god Hermes. The original image can be traced
        back to 4000 BC and is believed to have associated meanings with trade, liars, and thieves. However, today we associate this symbol with medicine, and even though there is no obvious link between
        the image and medicine, this sign can be seen in pharmacies and hospitals all over the world.
      </Typography>
      </Box>
      <Typography
        id="content_sec1"
        variant="h5"
        className={styles.embedded_content_section_title}
      >
        Types of signified meaning
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Just like how there are three different types of signifiers, there are also three different types of signified
        meaning. They are: <b>denotative meaning, connotative meaning,</b> and <b>myths</b>.
      </Typography>
      <Typography
        id="content_sec1"
        variant="h6"
        className={styles.embedded_content_section_title}
      >
        Denotative meaning
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        A sign's denotative meaning is its <b>literal meaning</b>. These are the obvious meanings everyone knows, i.e.,
        the meaning found in the dictionary. For example, the denotative meaning of the word 'blue' is a primary colour
        between green and violet in the colour spectrum'.
      </Typography>
      <Typography
        id="content_sec1"
        variant="h6"
        className={styles.embedded_content_section_title}
      >
        Connotative meaning
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        A sign's connotative meaning includes all of its implied and associated meanings. For example, the connotative
        meanings for the word 'blue' include feelings of sadness, representations of the sky and the ocean, and
        symbolism of trust, loyalty, and wisdom. 
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        The interpretation of a sign's connotative meaning usually depends on the individual, and the understanding can
        differ from person to person.
      </Typography>
      <Typography
        id="content_sec1"
        variant="h6"
        className={styles.embedded_content_section_title}
      >
        Myths
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        A sign's mythological meaning is usually very old and has been passed down through many generations. Mythological
        meanings are often religious or cultural and include many things seen in our daily lives, such as norms, values,
        and manners.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        An example is the yin and yang image, which has many mythological meanings in Chinese cultures, such as balance,
        femininity, darkness, and passivity. 
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          component="img"
          sx={{
            m: 3,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="img"
          src="/images/semiotics/Fig6.png"
        />
        <Typography variant="caption" sx={{m:"10px"}}>Fig. 6 - The yin and yang image.</Typography>
      </Box>
      <Typography
        id="content_sec4"
        variant="h5"
        className={styles.embedded_content_section_title}
      >
        Semiotic analysis
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Although the process of semiotic analysis has undoubtedly been around for many years, modern-day semiotic
        analysis in linguistics was introduced by Ferdinand de Saussure and Charles Sanders Peirce in the early 1900s.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Semiotic analysis is when we take a medium of communication (e.g. a novel, a blog, a poster, a textbook, an
        advertisement etc.) and <b>interpret the denotative, connotative, and mythological meaning of all of the signs
            together in context</b>.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        We can use semiotic analysis when conducting discourse analysis. For example, when analysing a news article, it's
        important to not only consider the words used, but also how the words work alongside the images, colours, and
        advertisements also used. The combination of these different signs could potentially have a different meaning
        than viewing them on their own.
      </Typography>
      <Typography
        id="content_sec5"
        variant="h5"
        className={styles.embedded_content_section_title}
      >
        Semiotics examples
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        One example of semiotics is the use of a red stop sign on a street. The sign itself is a symbol that represents
        the concept of "stop" and is universally recognized as such. The colour red is also a signifier of danger or
        caution, which adds to the overall meaning of the sign. This is an example of how semiotics is used to convey
        meaning through the use of symbols and signifiers.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Let's take a look at two more examples of semiotic analysis. We'll start with an easy one and then look at
        something a little more in-depth.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Semiotic example 1:
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          component="img"
          sx={{
            m: 3,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="img"
          src="/images/semiotics/Fig7.webp"
        />
        <Typography variant="caption" sx={{m:"10px"}}>Fig. 7 - The combination of the arrow, colour, and image gives this sign its meaning. What do you think this sign means?
        Although there are no words here, most people around the world will recognise this as an <b>emergency exit
        sign</b>. The combination of the colour green (which has connotations with 'go'), the arrow pointing left (a
        universally recognised icon signifier), and the image (an index signifier which shows the relationship between
        going left and exiting through a door), creates the semiotic meaning of the sign. You may have also seen this similar image before:
      </Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          component="img"
          sx={{
            m: 3,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="img"
          src="/images/semiotics/Fig8.jpg"
        />
        <Typography variant="caption" sx={{m:"10px"}}>Fig. 8 - The colour green helps people recognise the exit.Using the same colours helps activate individuals' prior knowledge, adding to the sign's meaning.</Typography>
      </Box>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Semiotic example 2:
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          component="img"
          sx={{
            m: 3,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="img"
          src="/images/semiotics/Fig9.webp"
        />
        <Typography variant="caption" sx={{m:"10px"}}>Fig. 9 - Propaganda posters can convey many different meanings.</Typography>
      </Box>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        When conducting a semiotic analysis of things such as posters, newspaper articles, book covers etc., try
        asking yourself the following questions:
      </Typography>
      <List>
        <ListItem>&bull;What are the key signifiers and what do they signify? Consider the language, images, colour, and general
            design.</ListItem>
        <ListItem>&bull;What are the potential denotative, connotative, and mythological meanings of the signs?</ListItem>
        <ListItem>&bull;What is the context?</ListItem>
      </List>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Let's apply these questions to the above poster from World War 1.
      </Typography>
      <List>
        <ListItem>&bull;The two men are shaking hands. The handshake gesture signifies 'unity' and 'welcoming'.</ListItem>
        <ListItem>&bull;The two men are shaking hands across this globe. This could signify a 'bridge' between the two countries.</ListItem>
        <ListItem>&bull;The term '<i>come across now</i>' is an imperative sentence, creating a demand and a sense of urgency.</ListItem>
        <ListItem>&bull;The image of the soldier makes it clear what type of person the Americans are hoping to attract.</ListItem>
        <ListItem>&bull;The American man wearing a suit has connotative meanings of wealth and class. </ListItem>
        <ListItem>&bull;The context of the time (during WordlWar 1) and the image of the man in uniform make it clear what 'You're needed' is referring to.</ListItem>
      </List>
      <Typography
        id="content_sec6"
        variant="h5"
        className={styles.embedded_content_section_title}
      >
        Semiotics and language teaching 
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Semiotics and teaching a first or second language often go hand in hand; this is because teachers will use
        images, signs, hand gestures, and visual aids (e.g. flashcards) to help them convey meaning.
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Semiotics is particularly useful in second language teaching as many signs are recognisable worldwide, meaning
        they make excellent teaching aids. 
      </Typography>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        Take a look at the following images for example:
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          component="img"
          sx={{
            m: 3,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="img"
          src="/images/semiotics/Fig10.png"
        />
        <Typography variant="caption" sx={{m:"10px"}}>Fig. 10 - Flashcards without a signified meaning are not very useful.</Typography>
      </Box>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        This image would be fairly meaningless to a Chinese speaker learning English as there is only a signifier
        and no signified meaning.
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Box
          component="img"
          sx={{
            m: 3,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="img"
          src="/images/semiotics/Fig11.png"
        />
        <Typography variant="caption" sx={{m:"10px"}}>Fig. 11 - Flashcards with images can help with the learning process.</Typography>
      </Box>
      <Typography variant="body1" className={styles.embedded_content_paragraph}>
        However, this image, which contains both the signifier and the signified, should be easily understood by
        the language learner.
      </Typography>
      <Typography
        id="content_sec7"
        variant="h5"
        className={styles.embedded_content_section_title}
      >
        Semiotics - Key Takeaways
      </Typography>
      <List>
        <ListItem>&bull;&nbsp;Semiotics is the study of visual language and signs. It looks at how meaning is created, not
            just with words, but also with images, symbols, gestures, sounds, and design. Semiotic analysis is
            when we analyse all of the meanings of all of the signs together in context.
        </ListItem>
        <ListItem>&bull;&nbsp;communicate meaning.</ListItem>
        <ListItem>
          &bull;&nbsp;The Swiss linguist Ferdinand de Saussure (1857-1913) and the American philosopher Charles Sanders Peirce
            (1839–1914) are widely considered the founders of modern semiotics.
        </ListItem>
        <ListItem>
          &bull;&nbsp;According to Charles Sanders Peirce, there are three different types of signifiers; Icons,
          Indexes, and symbols.
        </ListItem>
        <ListItem>
          &bull;&nbsp;There are also three different ways signs can be interpreted: the denotative meaning, the
          connotative meaning, and the mythological meaning.
        </ListItem>
      </List>
    </Box>
  );
}
