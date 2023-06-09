const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")

module.exports = {
  name: "abone-ver",
  description: "Abone rolü verirsin.",
  type: 1,
  options: [
    {
            name:"kullanıcı",
            description:"Bir kullanıcı seç.",
            type:6,
            required:true
        },
  ],

  run: async(client, interaction) => {
let rol = await db.fetch(`abone_${interaction.guild.id}`);
let yetkili = await db.fetch(`aboneyetkilisi_${interaction.guild.id}`);
      
     const yetkinyok = new EmbedBuilder()
      .setDescription(`Bu komutu kullanmak için <@&${yetkili}> rolüne sahip olmalısın.`)
      .setColor("Red")
      
 if(!interaction.member.roles.cache.has(yetkili)) return interaction.reply({embeds: [yetkinyok], ephemeral: true})
      
      const kullanıcı = interaction.options.getMember("kullanıcı")
      
      const ayarli_degil = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`Abone rolü zaten ayarlanmamış.`)
      if(!rol) return interaction.reply({embeds: [ayarli_degil], ephemeral: true})
      const ayarli_degill = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`Abone Yetkili rolü ayarlanmamış.`)
      if(!yetkili) return interaction.reply({embeds: [ayarli_degill], ephemeral: true})
     
    
    const otorol = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`${kullanıcı} adlı kullanıcıya abone rolü verildi.`)
    .setFooter({ text: `Abone Rolü Veren: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
interaction.reply({embeds: [otorol]})
  interaction.guild.members.cache.get(kullanıcı.id).roles.add(rol)
        
        


  }

};