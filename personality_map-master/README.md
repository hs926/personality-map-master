# Personality map

## Introduction
Data Visualization Project on March 2018.
Javascript, HTML, CSS.<br>
By Joshua Lee, Hanchun Shao, Yanfei Yu


Overview<br>
In this project, our group decided to explore the average personality of different countries in the world. Personality is described in 5 traits(factors), and user can also choose specific age group to feel the difference.

Description of Data<br>
Our data comes from answers to the [Big Five Personality Test](https://openpsychometrics.org/tests/IPIP-BFFM/), constructed with items from the International Personality Item Pool. Raw data can be downloaded [here](https://openpsychometrics.org/_rawdata/), or you can view them in data.csv. The original dataset consists of the 50 likert (1­5 scale used in psychology) rated statements of the test(each in one column), as well as gender, age, race, native language and country of the participants.

Then we pre­processed the data according to the scoring criteria to get the scores for the five traits: Extroversion(E), Neuroticism(N), Agreeableness(A), Conscientiousness(C), and Openness(O). To see the original 50 statements and scoring criteria, see personality­explanation.pdf. In order to use country code for country reference in our code, we merge the personality data with country info file(all.csv) and get np1.csv, in which each row represent an observation(info of a test participant), and each column stands for a variable (e.g., age, gender, country, E, N, A, C, O, country_code). Since we want to show personality for different countries and age groups, the data is then further grouped up by the two variables and the final output main data file is age_country.csv.

Filtering: we filtered out countries with less than 10 surveys(in total), because too few a sample of certain country is not representative at all. For the age variable, we first made a histogram in R to see the age distribution of ages in all and also in different countries, then we found out that the number of participants will be roughly the same if we divide age into three groups (13~20, 20~30 and 30~99). See pData.Rmd for details of pre­processing.

Description of the mapping<br>
For our personality pentagon, we had five linear scales (one for each personality trait) that mapped from [0­40] (the range for the scores on the individual traits) to [position of the center of the pentagon ­ position of the accompanying vertex of the personality trait]. We then created a pentagon by connecting the five points and filling the inside with a blue­ish color. We used a solid black pentagon with scores of 10 to represent the data for countries that we did not have in our dataset. We displayed the numerical score next to the personality trait on the pentagon in a light color, and showed how many surveys were used to calculate the mean personality scores.

As for our world map, we used an orthographic projection to have it globe­like. Each country had a country id that we could manipulate for mouse interactions. On hover, it would highlight that country and show the country name. On clicks, it would update the personality pentagon with the scores from that country and center the globe on that country. We chose lighter colors for the globe and pentagon so that it would mesh well with a white background.
For our age portraits, we made it so that upon being clicked, the personality pentagon would recalculate the scores only using the specified age group.

## The Story

Section1:<br>
We start with a simple description of what the audience can get from our data visualization. They can learn the basic personalities of each country based on the data set we found. They also can learn the personalities of three age groups (<20),(20­30),(>30) of each country.

We made a globe that can spin automatically to attract users to interact with it. Users can see the country’s name and click on any country they would like to know more about. In the meantime, the pentagon will change shape relative to the five personalities. We also made three figures to visually show the different age groups. After the portraits are clicked, the pentagon will change shape accordingly. We feel the pentagon is more fun and interactive than bar charts in showing the personalities.
![img](https://github.com/hs926/personality-map-master/raw/master/image/section 1.gif)

Section2:<br>
In the end, we want users to better know the five personalities we showed in our pentagon. We use different colors, movements and speed to express the feeling behind the specific personality. For example, Extroversion (E) means outgoing and energetic. We use hot red, large spin diameter and fast speed to express the meaning of extroversion. For Neuroticism(N), which means sensitive and nervous, we pick yellow based on the research related to colors and emotions published by Naz Kaya, Avery Gilbert, Alan Fridlund, and Laurie Lucchina. We use intense movement and tiny diameter to express the feeling of being sensitive and nervous. After users have a better understanding of each personality, they can go back and feel the differences between countries and age groups. They can feel the cultural differences through our simple data visualization.
![img](https://github.com/hs926/personality-map-master/raw/master/image/section 2.gif)
References<br>
globe inspired from http://bl.ocks.org/KoGor/5994804 <br>
pentagon coordinates inspired from https://bl.ocks.org/curran/8b4b7791fc25cfd2c459e74f3d0423f2 <br>
Five personalities inspired from https://bl.ocks.org/mbostock/7833311
