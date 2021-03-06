#!/usr/bin/env lua
require 'ext'
local url = require 'socket.url'

--local base = [[https://cdn.rawgit.com/thenumbernine/MathWorksheets/master/]]
--local base = [[https://htmlpreview.github.io/?https://github.com/thenumbernine/MathWorksheets/blob/master/]]
local base = [[https://thenumbernine.github.io/math/]]

local s = table{[[
Some helper worksheets for my projects.

Here's the CDN URLs:
]]}

local fs = os.rlistdir('.', function(f, isdir)
	return f ~= '.git' and (isdir or f:sub(-5) == '.html')
end):mapi(function(f)
	assert(f:sub(1,2) == './')
	return f:sub(3)
end):sort():mapi(function(f)
	local name = f:sub(1,-6)
	s:insert('['..name..']('..base..
		url.escape(f)
			:gsub('%%2f','/')
			:gsub('%%2e','.')
		..')\n')
end)

file['README.md'] = s:concat'\n'
