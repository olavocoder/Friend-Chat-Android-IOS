import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'chat',
  title: 'Chat',
  type: 'object',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'conversation',
      title: 'conversation',
      type: 'array',
      of: [{type: 'comments'}],
    }),
  ],
  preview: {
    select: {
      title: 'author.nickName',
    },
  },
})
