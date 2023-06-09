const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")

module.exports = {
  name: "abone-sistemi-sıfırla",
  description: "Abone Sistemi sıfırlarsın.",
  type: 1,
  options: [],

  run: async(client, interaction) => {
const abonerol = db.fetch(`abone_${interaction.guild.id}`)
const aboneyetkili = db.fetch(`aboneyetkilisi_${interaction.guild.id}`)
      
     const yetkinyok = new EmbedBuilder()
      .setDescription("Bu komutu kullanmak için **Yönetici** yetkisine sahip olmalısın")
      .setColor("Red")
      
 if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({embeds: [yetkinyok], ephemeral: true})
 
      const aboneroll = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`Abone rolü ayarlanmamış`)
     if(!abonerol) return interaction.reply({embeds: [aboneroll], ephemeral: true})
      const aboneyetkilii = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`Abone Yetkili rolü ayarlanmamış.`)
     if(!aboneyetkili) return interaction.reply({embeds: [aboneyetkilii], ephemeral: true})
     db.delete(`aboneyetkilisi_${interaction.guild.id}`)
db.delete(`abone_${interaction.guild.id}`)
    
    const otorol = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`Abone sistemi başarıyla sıfırlandı.`)
interaction.reply({embeds: [otorol]})

  }

};